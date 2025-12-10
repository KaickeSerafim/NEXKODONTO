from django.db import models
from django.conf import settings
from apps.clinic.models import Paciente

USER = settings.AUTH_USER_MODEL
class PatientDocument(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name="documentos")
    enviado_por = models.ForeignKey(USER, on_delete=models.SET_NULL, null=True)
    arquivo = models.FileField(upload_to="pacientes/documentos/")
    tipo = models.CharField(max_length=50, choices=[
        ('exame', 'Exame'),
        ('raio_x', 'Raio-X'),
        ('foto', 'Foto'),
        ('documento', 'Documento Geral'),
        ('comprovante', 'Comprovante de Pagamento'),
    ])
    descricao = models.TextField(blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Doc {self.tipo} - {self.paciente.nome}"