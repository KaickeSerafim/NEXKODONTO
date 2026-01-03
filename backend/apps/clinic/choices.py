from django.db import models


class StatusAgendamento(models.TextChoices):
    AGENDADA = 'agendada', 'Agendada'
    PENDENTE = 'pendente', 'Pendente'
    CONFIRMADA = 'confirmada', 'Confirmada'
    CANCELADA = 'cancelada', 'Cancelada'
    CONCLUIDA = 'concluida', 'Concluída'
    FALTOU = 'faltou', 'Faltou'

class PrioridadeTratamento(models.TextChoices):
    BAIXA = 'baixa', 'Baixa',
    MEDIA = 'media', 'Média',
    ALTA = 'alta', 'Alta',