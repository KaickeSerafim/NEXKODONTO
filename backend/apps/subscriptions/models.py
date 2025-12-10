
from django.db import models
from apps.usuarios.models import CustomUser

class Plano(models.Model):
    nome = models.CharField(max_length=50)
    preco_mensal = models.DecimalField(max_digits=10, decimal_places=2)
    descricao = models.TextField(null=True, blank=True)
    limite_consultas = models.IntegerField(default=100)  # opcional

    def __str__(self):
        return self.nome


class Assinatura(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    plano = models.ForeignKey(Plano, on_delete=models.CASCADE)
    data_inicio = models.DateField()
    data_fim = models.DateField()
    ativo = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} - {self.plano.nome}"


class PagamentoLog(models.Model):
    subscription = models.ForeignKey(Assinatura, on_delete=models.CASCADE)
    data = models.DateTimeField(auto_now_add=True)
    valor_pago = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default="sucesso")  # erro, aguardando etc.
