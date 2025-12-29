from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import Agendamento, Atendimentos
import threading

_thread_locals = threading.local()

def set_current_user(user):
    _thread_locals.user = user

def get_current_user():
    return getattr(_thread_locals, 'user', None)

@receiver(pre_save, sender=Agendamento)
def set_updated_by(sender, instance, **kwargs):
    if instance.pk:
        user = get_current_user()
        if user:
            instance.updated_by = user

@receiver(post_save, sender=Agendamento)
def processar_agendamento_passado(sender, instance, created, **kwargs):
    """
    Se o agendamento for salvo com uma data no passado, desativa-o
    e cria automaticamente um registro de Atendimento.
    """
    if instance.active and instance.data_hora < timezone.now():
        # Usamos update para evitar disparar o sinal novamente em loop
        Agendamento.objects.filter(pk=instance.pk).update(active=False)
        
        # Garante que não criamos duplicatas se o OneToOneField já existir
        if not hasattr(instance, 'atendimento'):
            Atendimentos.objects.create(
                agendamento=instance,
                diagnostico="Consulta realizada (Finalizada automaticamente)",
                tratamento_realizado=instance.observacoes if instance.observacoes else "Realizado conforme agendamento"
            )

