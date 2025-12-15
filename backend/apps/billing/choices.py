from django.db import models


class MetodoPagamento(models.TextChoices):
    PIX = 'pix', 'PIX',
    DINHEIRO = 'dinheiro', 'Dinheiro',
    CARTAO = 'cartao', 'Cartão',
    BOLETO = 'boleto', 'Boleto',
    OUTRO = 'outro', 'Outro',


class StatusPagamento(models.TextChoices):
    PAGO = 'pago', 'Pago',
    PENDENTE = 'pendente', 'Pendente',
    CANCELADO = 'cancelado', 'Cancelado',
    OUTRO = 'outro', 'Outro',