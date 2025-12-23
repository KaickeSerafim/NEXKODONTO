from rest_framework import serializers
from ..models import Procedimento

class ProcedimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedimento
        fields = ['id', 'nome', 'duracao_minutos', 'preco_base', 'criado_em', 'atualizado_em', 'dentista']
