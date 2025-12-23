from rest_framework import serializers
from ..models import PlanoTratamento

class PlanoTratamentoSerializer(serializers.ModelSerializer):
    dentista_nome = serializers.CharField(source='dentista.get_full_name', read_only=True)
    
    class Meta:
        model = PlanoTratamento
        fields = ['id', 'paciente', 'dentista', 'dentista_nome', 'prioridade', 
                  'descricao', 'custo_estimado', 'criado_em', 'atualizado_em']
        read_only_fields = ['id', 'criado_em', 'atualizado_em', 'dentista_nome']
