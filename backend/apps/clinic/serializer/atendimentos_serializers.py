from rest_framework import serializers
from ..models import Atendimentos

class AtendimentoSerializer(serializers.ModelSerializer):
    agendamento_data = serializers.DateTimeField(source='agendamento.data_hora', read_only=True)
    paciente_nome = serializers.CharField(source='agendamento.paciente.nome', read_only=True)
    
    class Meta:
        model = Atendimentos
        fields = ['id', 'agendamento', 'agendamento_data', 'paciente_nome', 'diagnostico', 
                  'tratamento_realizado', 'proximo_passos', 'criado_em', 'atualizado_em']
        read_only_fields = ['id', 'criado_em', 'atualizado_em', 'agendamento_data', 'paciente_nome']
