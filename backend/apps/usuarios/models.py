from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import time
from .choices import RoleUserChoice

class CustomUser(AbstractUser):

    role = models.CharField(max_length=20, choices=RoleUserChoice.choices, default='dentista')
    
    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new:
            self.assign_role()
    
    def assign_role(self):
        from rolepermissions.roles import assign_role
        if self.role == 'dentista':
            assign_role(self, 'dentista')
        elif self.role == 'secretaria':
            assign_role(self, 'secretaria')
        elif self.role == 'admin':
            assign_role(self, 'admin_sistema')
    foto = models.ImageField(upload_to="users/", null=True, blank=True)
    cro = models.CharField(max_length=20, null=True, blank=True)
    telefone = models.CharField(max_length=15, null=True, blank=True)
    endereco = models.CharField(max_length=255, null=True, blank=True)
    
    # Dados bancários do dentista
    pix = models.CharField(max_length=50, null=True, blank=True)
    banco = models.CharField(max_length=50, null=True, blank=True)
    agencia = models.CharField(max_length=20, null=True, blank=True)
    conta = models.CharField(max_length=20, null=True, blank=True)

    # Dentistas associados (somente usado se user for SECRETARIA)
    dentistas_responsaveis = models.ManyToManyField(
        'self',
        blank=True,
        symmetrical=False,
        related_name="secretarias_responsaveis",
    )


class HorarioTrabalho(models.Model):
    WEEKDAYS = [
        (0, 'Segunda'), (1, 'Terça'), (2, 'Quarta'),
        (3, 'Quinta'), (4, 'Sexta'), (5, 'Sábado'), (6, 'Domingo'),
    ]
    dentista = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='horarios_trabalho')
    dia_semana = models.IntegerField(choices=WEEKDAYS)
    hora_inicio = models.TimeField(default=time(8, 0))
    hora_fim = models.TimeField(default=time(18, 0))
    intervalo_inicio = models.TimeField(default=time(12, 0), null=True, blank=True)
    intervalo_fim = models.TimeField(default=time(13, 0), null=True, blank=True)

    class Meta:
        unique_together = ('dentista', 'dia_semana')
        verbose_name = "Horário de Trabalho"

class BloqueioAgenda(models.Model):
    dentista = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='bloqueios')
    data = models.DateField()
    hora_inicio = models.TimeField(null=True, blank=True, help_text="Vazio para dia todo")
    hora_fim = models.TimeField(null=True, blank=True, help_text="Vazio para dia todo")
    motivo = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"Bloqueio {self.dentista.username} - {self.data}"