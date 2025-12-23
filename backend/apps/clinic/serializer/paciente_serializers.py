from rest_framework import serializers
from ..models import Paciente
from .historico_medico_serializers import HistoricoMedicoSerializer
from .plano_tratamento_serializers import PlanoTratamentoSerializer

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = ['id', 'nome', 'telefone', 'email', 'dentista', 'data_nascimento', 
                  'endereco', 'cidade', 'estado', 'cep', 'observacoes']
        read_only_fields = ['id']

class FichaPacienteSerializer(serializers.ModelSerializer):
    historico_medico = HistoricoMedicoSerializer(read_only=True)
    planos_tratamento = PlanoTratamentoSerializer(many=True, read_only=True)
    # consultas will be added in get_fields to avoid circular import
    consultas = serializers.SerializerMethodField()
    
    class Meta:
        model = Paciente
        fields = ['id', 'nome', 'telefone', 'email',
        'cpf', 'data_nascimento', 
                  'endereco', 'cidade', 'estado', 'cep', 'observacoes',
                  'historico_medico', 'planos_tratamento', 'consultas']
        read_only_fields = ['id']

    def get_consultas(self, obj):
        from .agendamento_serializers import AgendamentoSerializer
        consultas = obj.consultas.all() # Correct related_name from models.py
        return AgendamentoSerializer(consultas, many=True).data
