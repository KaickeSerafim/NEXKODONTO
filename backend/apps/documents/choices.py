from django.db import models

class TipoDocumento(models.TextChoices):
    EXAME = 'exame', 'Exame'
    RAIO_X = 'raio_x', 'Raio-X'
    FOTO = 'foto', 'Foto'
    DOCUMENTO = 'documento', 'Documento Geral'
    COMPROVANTE = 'comprovante', 'Comprovante de Pagamento'
