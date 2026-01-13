from django.core.exceptions import ValidationError
from django.db.models import Q
from ..choices import StatusAgendamento

def validate_appointment_overlap(dentista, data_hora, duracao_estimada, exclude_id=None):
    """
    Verifica se existe sobreposição de horário para o dentista informado.
    Ignora agendamentos cancelados ou que o paciente faltou.
    """
    if not data_hora or not duracao_estimada:
        return

    from datetime import timedelta
    data_hora_fim = data_hora + timedelta(minutes=duracao_estimada)

    # Status que bloqueiam o horário
    status_bloqueantes = [
        StatusAgendamento.AGENDADA,
        StatusAgendamento.CONFIRMADA,
        StatusAgendamento.CONCLUIDA
    ]

    from ..models import Agendamento
    
    # Query para buscar sobreposições
    # (StartA < EndB) and (EndA > StartB)
    conflitos = Agendamento.objects.filter(
        dentista=dentista,
        status__in=status_bloqueantes,
        active=True
    ).filter(
        Q(data_hora__lt=data_hora_fim) & Q(data_hora_fim__gt=data_hora)
    )

    if exclude_id:
        conflitos = conflitos.exclude(id=exclude_id)

    if conflitos.exists():
        conflito = conflitos.first()
        horario_conflito = conflito.data_hora.strftime('%H:%M')
        horario_fim_conflito = conflito.data_hora_fim.strftime('%H:%M')
        raise ValidationError(
            f"Conflito de horário: Já existe um agendamento das {horario_conflito} às {horario_fim_conflito}."
        )

    # 4. Verificar bloqueios manuais (BloqueioAgenda)
    from apps.usuarios.models import BloqueioAgenda
    data_consulta = data_hora.date()
    hora_inicio = data_hora.time()
    hora_fim = data_hora_fim.time()

    bloqueios = BloqueioAgenda.objects.filter(dentista=dentista, data=data_consulta)
    for bloqueio in bloqueios:
        if bloqueio.hora_inicio is None and bloqueio.hora_fim is None:
            raise ValidationError("Este dia está totalmente bloqueado para novos agendamentos.")
        
        if bloqueio.hora_inicio and bloqueio.hora_fim:
            # (StartA < EndB) and (EndA > StartB)
            if hora_inicio < bloqueio.hora_fim and hora_fim > bloqueio.hora_inicio:
                raise ValidationError(f"O horário está bloqueado: {bloqueio.motivo or 'Sem motivo'}")
