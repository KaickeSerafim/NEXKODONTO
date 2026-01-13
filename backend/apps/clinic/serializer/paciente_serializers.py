from rest_framework import serializers
from ..models import Paciente
from .historico_medico_serializers import HistoricoMedicoSerializer
from .plano_tratamento_serializers import PlanoTratamentoSerializer

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = ['id', 'nome', 'telefone', 'email', 'dentista', 'data_nascimento', 
                  'endereco', 'cidade', 'estado', 'cep', 'observacoes']
        read_only_fields = ['id', 'dentista']

class FichaPacienteSerializer(serializers.ModelSerializer):
    historico_medico = HistoricoMedicoSerializer(read_only=True)
    planos_tratamento = PlanoTratamentoSerializer(many=True, read_only=True)
    consultas = serializers.SerializerMethodField()
    atendimentos_historico = serializers.SerializerMethodField()
    
    class Meta:
        model = Paciente
        fields = ['id', 'nome', 'telefone', 'email',
        'cpf', 'data_nascimento', 
                  'endereco', 'cidade', 'estado', 'cep', 'observacoes',
                  'historico_medico', 'planos_tratamento', 'consultas', 'atendimentos_historico']
        read_only_fields = ['id']

    def get_consultas(self, obj):
        from .agendamento_serializers import AgendamentoSerializer
        consultas = obj.consultas.all()
        return AgendamentoSerializer(consultas, many=True).data

    def get_atendimentos_historico(self, obj):
        from .atendimentos_serializers import AtendimentoSerializer
        from ..models import Atendimentos
        atendimentos = Atendimentos.objects.filter(agendamento__paciente=obj).order_by('-criado_em')
        return AtendimentoSerializer(atendimentos, many=True).data
