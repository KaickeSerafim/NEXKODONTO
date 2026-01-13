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

        # 4. Gerar slots (30 min)
        slots = []
        current_dt = datetime.combine(target_date, h_inicio)
        end_dt = datetime.combine(target_date, h_fim)

        while current_dt < end_dt:
            slot_time = current_dt.time()
            current_dt_end = current_dt + timedelta(minutes=30)
            
            # Verificar se está no intervalo
            is_intervalo = False
            if int_inicio and int_fim:
                if int_inicio <= slot_time < int_fim:
                    is_intervalo = True

            # Verificar se está bloqueado manualmente
            is_bloqueado = False
            for b in bloqueios:
                if b.hora_inicio and b.hora_fim:
                    if b.hora_inicio <= slot_time < b.hora_fim:
                        is_bloqueado = True
                        break
                else:
                    # Bloqueio de dia todo
                    is_bloqueado = True
                    break

            # Encontrar agendamento que sobrepõe este slot
            slot_status = 'disponivel' # Cinza
            paciente_nome = None
            
            for ag in agendamentos:
                # Se o agendamento começa ou ocorre durante este slot
                if ag.data_hora.time() <= slot_time < ag.data_hora_fim.time():
                    if ag.status == StatusAgendamento.CONFIRMADA or ag.status == StatusAgendamento.CONCLUIDA:
                        slot_status = 'ocupado' # Verde
                    else:
                        slot_status = 'pendente' # Amarelo
                    paciente_nome = ag.paciente.nome
                    break

            if is_intervalo or is_bloqueado:
                slot_info = {
                    'hora': slot_time.strftime('%H:%M'),
                    'status': 'bloqueado',
                    'paciente': 'Intervalo/Bloqueio' if is_intervalo else 'Bloqueado',
                    'disponivel': False
                }
            else:
                slot_info = {
                    'hora': slot_time.strftime('%H:%M'),
                    'status': slot_status,
                    'paciente': paciente_nome,
                    'disponivel': slot_status == 'disponivel'
                }
            
            slots.append(slot_info)
            current_dt = current_dt_end

        return ResponseBuilder().success("Disponibilidade listada").with_data({
            'data': target_date.strftime('%Y-%m-%d'),
            'slots': slots
        }).to_response()
