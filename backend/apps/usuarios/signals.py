from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser, HorarioTrabalho

@receiver(post_save, sender=CustomUser)
def criar_configuracoes_dentista(sender, instance, created, **kwargs):
    """
    Sempre que um novo usuário for criado e ele for um DENTISTA,
    cria automaticamente a grade de horários de Segunda a Sexta.
    """
    if created and instance.role == 'dentista':
        # Dias de Segunda (0) a Sexta (4)
        for dia in range(5):
            HorarioTrabalho.objects.get_or_create(
                dentista=instance,
                dia_semana=dia,
                defaults={
                    'hora_inicio': '08:00',
                    'hora_fim': '18:00',
                    'intervalo_inicio': '12:00',
                    'intervalo_fim': '13:00'
                }
            )