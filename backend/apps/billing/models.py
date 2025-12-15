from django.db import models
from django.conf import settings

from .choices import MetodoPagamento, StatusPagamento
from apps.clinic.models import Paciente
from apps.clinic.models import Agendamento

USER = settings.AUTH_USER_MODEL

class Pagamento(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name="pagamentos", null=True, blank=True)
    dentista = models.ForeignKey(USER, on_delete=models.CASCADE, related_name="pagamentos_recebidos",  null=True, blank=True)
    agendamento = models.ForeignKey(Agendamento, on_delete=models.CASCADE, related_name="pagamentos", null=True, blank=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    status= models.CharField(max_length=30, choices=StatusPagamento.choices, default=StatusPagamento.PENDENTE)
    metodo = models.CharField(max_length=30, choices=MetodoPagamento.choices, default=MetodoPagamento.OUTRO, null=True, blank=True)
    comprovante = models.FileField(upload_to="pacientes/pagamentos/", null=True, blank=True)
    observacoes = models.TextField(blank=True, null=True)
    pago_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Pagamento {self.paciente.nome} - R${self.valor}"