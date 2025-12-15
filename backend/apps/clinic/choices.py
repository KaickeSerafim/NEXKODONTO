from django.db import models


class StatusAgendamento(models.TextChoices):
    PENDENTE = 'pendente', 'Pendente',
    CONFIRMADA = 'confirmada', 'Confirmada',
    CANCELADA = 'cancelada', 'Cancelada',

