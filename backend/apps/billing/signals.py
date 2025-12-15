from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.clinic.models import Agendamento
from .models import Pagamento

@receiver(post_save, sender=Agendamento)
def criar_pagamento_agendamento(sender, instance, created, **kwargs):
    if created:
        Pagamento.objects.create(
            paciente=instance.paciente,
            dentista=instance.dentista,
            agendamento=instance,
            valor=0.00
        )
