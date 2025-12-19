from django.db import models
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
