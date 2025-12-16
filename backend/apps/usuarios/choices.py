from django.db import models

class RoleUserChoice(models.TextChoices):
    DENTISTA = 'dentista', 'Dentista'
    SECRETARIA = 'secretaria', 'Secretária'
    ADMIN = 'admin', 'Administrador'
