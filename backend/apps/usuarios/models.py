from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
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
