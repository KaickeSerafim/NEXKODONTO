from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from datetime import datetime, time, timedelta
from django.utils import timezone
from ..models import Agendamento
from apps.usuarios.models import HorarioTrabalho, BloqueioAgenda
from ..choices import StatusAgendamento
from apps.utils.response_builder import ResponseBuilder

class DisponibilidadeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data_str = request.query_params.get('data')
        dentista_id = request.query_params.get('dentista_id')
        
        if not data_str:
            target_date = timezone.now().date()
        else:
            try:
                target_date = datetime.strptime(data_str, '%Y-%m-%d').date()
            except ValueError:
                return ResponseBuilder().error("Formato de data inválido. Use YYYY-MM-DD").to_response()

        dentista = request.user
        if dentista_id:
            from apps.usuarios.models import CustomUser
            try:
                dentista = CustomUser.objects.get(id=dentista_id)
            except CustomUser.DoesNotExist:
                return ResponseBuilder().error("Dentista não encontrado").to_response()

        # 1. Pegar horário de trabalho
        dia_semana = target_date.weekday()
        horario = HorarioTrabalho.objects.filter(dentista=dentista, dia_semana=dia_semana).first()
        
        if horario:
            h_inicio = horario.hora_inicio
            h_fim = horario.hora_fim
            int_inicio = horario.intervalo_inicio
            int_fim = horario.intervalo_fim
        else:
            # Padrão caso não configurado
            h_inicio = time(8, 0)
            h_fim = time(18, 0)
            int_inicio = time(12, 0)
            int_fim = time(13, 0)

        # 2. Pegar bloqueios
        bloqueios = BloqueioAgenda.objects.filter(dentista=dentista, data=target_date)

        # 3. Pegar agendamentos ativos
        status_bloqueantes = [
            StatusAgendamento.AGENDADA,
            StatusAgendamento.CONFIRMADA,
            StatusAgendamento.CONCLUIDA
        ]
        agendamentos = Agendamento.objects.filter(
            dentista=dentista,
            data_hora__date=target_date,
            status__in=status_bloqueantes,
            active=True
        ).select_related('paciente')

        # 4. Gerar slots dinâmicos
        slots = []
        current_dt = datetime.combine(target_date, h_inicio)
        end_dt = datetime.combine(target_date, h_fim)
        
        # Horário atual para comparação (past prevention)
        now = timezone.now()
        if timezone.is_naive(now):
            now = timezone.make_aware(now)

        while current_dt < end_dt:
            slot_time = current_dt.time()
            
            # 1. Verificar se está no passado (para hoje)
            is_passado = False
            dt_aware = timezone.make_aware(current_dt) if timezone.is_naive(current_dt) else current_dt
            if dt_aware < now:
                is_passado = True

            # 2. Verificar se está no intervalo
            is_intervalo = False
            intervalo_fim_dt = None
            if int_inicio and int_fim:
                if int_inicio <= slot_time < int_fim:
                    is_intervalo = True
                    intervalo_fim_dt = datetime.combine(target_date, int_fim)

            # 3. Verificar se está bloqueado manualmente
            is_bloqueado = False
            bloqueio_fim_dt = None
            for b in bloqueios:
                if b.hora_inicio and b.hora_fim:
                    if b.hora_inicio <= slot_time < b.hora_fim:
                        is_bloqueado = True
                        bloqueio_fim_dt = datetime.combine(target_date, b.hora_fim)
                        break
                else:
                    # Bloqueio de dia todo
                    is_bloqueado = True
                    bloqueio_fim_dt = end_dt
                    break

            # 4. Encontrar agendamento que sobrepõe este horário
            ag_encontrado = None
            for ag in agendamentos:
                # Convertemos para local time ANTES de comparar, pois slots estão em local time
                ag_inicio_local = timezone.localtime(ag.data_hora)
                ag_fim_local = timezone.localtime(ag.data_hora_fim)
                
                # Comparamos o tempo do slot com o intervalo do agendamento (tudo em local time)
                if ag_inicio_local.time() <= slot_time < ag_fim_local.time():
                    ag_encontrado = ag
                    break

            if ag_encontrado:
                status_slot = 'ocupado' if ag_encontrado.status in [StatusAgendamento.CONFIRMADA, StatusAgendamento.CONCLUIDA] else 'pendente'
                ag_fim_local_jump = timezone.localtime(ag_encontrado.data_hora_fim)
                slots.append({
                    'hora': slot_time.strftime('%H:%M'),
                    'hora_fim': ag_fim_local_jump.strftime('%H:%M'),
                    'status': status_slot,
                    'paciente': ag_encontrado.paciente.nome,
                    'disponivel': False
                })
                current_dt = datetime.combine(target_date, ag_fim_local_jump.time())
            elif is_intervalo:
                slots.append({
                    'hora': slot_time.strftime('%H:%M'),
                    'hora_fim': intervalo_fim_dt.strftime('%H:%M'),
                    'status': 'bloqueado',
                    'paciente': 'Intervalo',
                    'disponivel': False
                })
                current_dt = intervalo_fim_dt
            elif is_bloqueado:
                slots.append({
                    'hora': slot_time.strftime('%H:%M'),
                    'hora_fim': bloqueio_fim_dt.strftime('%H:%M'),
                    'status': 'bloqueado',
                    'paciente': 'Bloqueado',
                    'disponivel': False
                })
                current_dt = bloqueio_fim_dt
            else:
                # Slot disponível
                next_dt = current_dt + timedelta(minutes=30)
                slots.append({
                    'hora': slot_time.strftime('%H:%M'),
                    'hora_fim': next_dt.strftime('%H:%M'),
                    'status': 'disponivel',
                    'paciente': None,
                    'disponivel': not is_passado
                })
                # Avança 30 minutos por padrão para slots vazios
                current_dt = next_dt

        return ResponseBuilder().success("Disponibilidade listada").with_data({
            'data': target_date.strftime('%Y-%m-%d'),
            'slots': slots
        }).to_response()
