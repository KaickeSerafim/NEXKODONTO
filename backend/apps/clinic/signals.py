from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Agendamento
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
