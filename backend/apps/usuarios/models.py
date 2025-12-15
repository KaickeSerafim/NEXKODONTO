from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
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
