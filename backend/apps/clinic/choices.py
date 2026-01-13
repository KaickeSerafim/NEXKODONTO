from django.db import models


class StatusAgendamento(models.TextChoices):
    AGENDADA = 'agendada', 'Agendada'
    CONFIRMADA = 'confirmada', 'Confirmada'
    FALTOU = 'faltou', 'Faltou'
    CANCELADA = 'cancelada', 'Cancelada'
    CONCLUIDA = 'concluida', 'Concluída'

class PrioridadeTratamento(models.TextChoices):
    BAIXA = 'baixa', 'Baixa'
    MEDIA = 'media', 'Média'
    ALTA = 'alta', 'Alta'