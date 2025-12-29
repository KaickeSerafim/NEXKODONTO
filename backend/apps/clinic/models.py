from django.conf import settings
from django.db import models
from django.utils import timezone
from datetime import timedelta
from .choices import StatusAgendamento, PrioridadeTratamento


USER = settings.AUTH_USER_MODEL

class Paciente(models.Model):
    nome = models.CharField(max_length=200)
    cpf = models.CharField(max_length=14, null=True, blank=True)
    telefone = models.CharField(max_length=30, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    # paciente pertence a um dentista (responsável)
    dentista = models.ForeignKey(USER, on_delete=models.CASCADE, related_name='pacientes')
    data_nascimento = models.DateField(null=True, blank=True)
    endereco = models.CharField(max_length=255, null=True, blank=True)
    cidade = models.CharField(max_length=100, null=True, blank=True)
    estado = models.CharField(max_length=100, null=True, blank=True)
    cep = models.CharField(max_length=20, null=True, blank=True)
    observacoes = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.nome} ({self.dentista.username})"

class Procedimento(models.Model):
    # Relacionado ao dentista para cada um ter seus preços e durações
    dentista = models.ForeignKey(USER, on_delete=models.CASCADE, related_name='procedimentos')
    nome = models.CharField(max_length=100) 
    duracao_minutos = models.PositiveIntegerField(default=30) 
    preco_base = models.DecimalField(max_digits=10, decimal_places=2)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nome} ({self.duracao_minutos} min)"

class Agendamento(models.Model):
    # NOVO: Vinculamos o procedimento para saber a duração
    procedimento = models.ForeignKey(Procedimento, on_delete=models.PROTECT, related_name='agendamentos', null=True)


    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='consultas')
    dentista = models.ForeignKey(USER, on_delete=models.CASCADE, related_name='consultas')
    criado_por = models.ForeignKey(USER, on_delete=models.SET_NULL, null=True, blank=True, related_name='consultas_criadas')
    data_hora = models.DateTimeField()
    active = models.BooleanField(default=True)
    data_hora_fim = models.DateTimeField(editable=False, null=True, blank=True)
    motivo = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=20, choices=StatusAgendamento.choices, default='agendada')
    observacoes = models.TextField(null=True, blank=True)
    updated_by = models.ForeignKey(USER, on_delete=models.SET_NULL, null=True, blank=True, related_name='consultas_atualizadas')
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)


    class Meta:
        ordering = ['-data_hora']

    def save(self, *args, **kwargs):
        # Lógica automática: Se tem procedimento, calcula o fim da consulta
        if self.procedimento and self.data_hora:
            self.data_hora_fim = self.data_hora + timedelta(minutes=self.procedimento.duracao_minutos)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Consulta {self.paciente.nome} - {self.dentista.username} @ {self.data_hora}"


class Atendimentos(models.Model):
    agendamento = models.OneToOneField(Agendamento, on_delete=models.CASCADE, related_name='atendimento')
    status = models.CharField(max_length=20, choices=StatusAgendamento.choices, default='agendada')
    diagnostico = models.TextField()
    tratamento_realizado = models.TextField()
    proximo_passos = models.TextField(null=True, blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Atendimento para {self.agendamento.paciente.nome} em {self.agendamento.data_hora}"



class PlanoTratamento(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='planos_tratamento')
    dentista = models.ForeignKey(USER, on_delete=models.CASCADE, related_name='planos_tratamento', null=True, blank=True)
    prioridade = models.CharField(max_length=20, choices=PrioridadeTratamento.choices, default='media')
    descricao = models.TextField(null=True, blank=True)
    custo_estimado = models.DecimalField(max_digits=10, decimal_places=2)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Plano de Tratamento para {self.paciente.nome} - {self.descricao[:30]}..."

class HistoricoMedico(models.Model):
    paciente = models.OneToOneField(Paciente, on_delete=models.CASCADE, related_name='historico_medico')
    alergias = models.TextField(null=True, blank=True)
    condicoes_medicas = models.TextField(null=True, blank=True)
    medicamentos = models.TextField(null=True, blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Histórico Médico de {self.paciente.nome}"






