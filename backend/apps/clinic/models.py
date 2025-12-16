from django.conf import settings
from django.db import models
from django.utils import timezone
from .choices import StatusAgendamento


USER = settings.AUTH_USER_MODEL

class Paciente(models.Model):
    nome = models.CharField(max_length=200)
    telefone = models.CharField(max_length=30, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    # paciente pertence a um dentista (responsável)
    dentista = models.ForeignKey(USER, on_delete=models.CASCADE, related_name='pacientes')

    def __str__(self):
        return f"{self.nome} ({self.dentista.username})"


class Agendamento(models.Model):


    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='consultas')
    dentista = models.ForeignKey(USER, on_delete=models.CASCADE, related_name='consultas')
    criado_por = models.ForeignKey(USER, on_delete=models.SET_NULL, null=True, blank=True, related_name='consultas_criadas')
    data_hora = models.DateTimeField()
    motivo = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=20, choices=StatusAgendamento.choices, default='agendada')
    observacoes = models.TextField(null=True, blank=True)
    updated_by = models.ForeignKey(USER, on_delete=models.SET_NULL, null=True, blank=True, related_name='consultas_atualizadas')
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)


    class Meta:
        ordering = ['-data_hora']

    def __str__(self):
        return f"Consulta {self.paciente.nome} - {self.dentista.username} @ {self.data_hora}"
