from django.db import models
from django.conf import settings
from apps.clinic.models import Paciente 

# Create your models here.
class WhatsAppSession(models.Model):
    session_id = models.CharField(max_length=255, unique=True)
    status = models.CharField(max_length=50, default="DISCONNECTED")
    qr_code = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.session_id

class ChatbotConfig(models.Model):
    """Configurações personalizadas do Dentista"""
    dentista = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='bot_config', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)
    mensagem_bem_vindo = models.TextField(default="Olá! Sou o assistente virtual. Como posso ajudar?")
    modelo_ai = models.CharField(max_length=50, default="llama-3.1-70b")
    chave_pix = models.CharField(max_length=255, blank=True, null=True) # Para receber pagamentos


class WhatsAppConversation(models.Model):
    """Histórico de conversas"""
    session = models.ForeignKey(WhatsAppSession, on_delete=models.CASCADE)
    paciente_telefone = models.CharField(max_length=30) # ID do chat (ex: 551199999999@c.us)
    ultima_interacao = models.DateTimeField(auto_now=True)
    # Contexto para IA saber o que estava falando
    contexto_conversacao = models.JSONField(default=dict) 

    def __str__(self):
        return f"{self.paciente_telefone} - {self.ultima_interacao}"
