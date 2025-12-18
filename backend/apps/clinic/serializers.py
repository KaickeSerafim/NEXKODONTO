from rest_framework import serializers
from .models import Paciente, Agendamento, HistoricoMedico, PlanoTratamento, Atendimentos
from apps.usuarios.models import CustomUser
from apps.billing.models import Pagamento

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = ['id', 'nome', 'telefone', 'email', 'dentista', 'data_nascimento', 
                  'endereco', 'cidade', 'estado', 'cep', 'observacoes']
        read_only_fields = ['id']

class DentistaSerializer(serializers.ModelSerializer):
    nome_completo = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'nome_completo', 'email']
        read_only_fields = ['id']
    
    def get_nome_completo(self, obj):
        return obj.get_full_name()

class PagamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagamento
        fields = ['id', 'agendamento', 'status', 'pago_em']
        read_only_fields = ['id']

class CriadoPorSerializer(serializers.ModelSerializer):
    nome_completo = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = ['id', 'username','nome_completo']
        read_only_fields = ['id']
    
    def get_nome_completo(self, obj):
        return obj.get_full_name()

class AtualizadoPorSerializer(serializers.ModelSerializer):
    nome_completo = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = ['nome_completo']
    
    def get_nome_completo(self, obj):
        return obj.get_full_name()

class AgendamentoSerializer(serializers.ModelSerializer):
    paciente_detail = PacienteSerializer(source='paciente', read_only=True)
    dentista_detail = DentistaSerializer(source='dentista', read_only=True)
    criado_por_detail = CriadoPorSerializer(source='criado_por', read_only=True)
    updated_by_detail = AtualizadoPorSerializer(source='updated_by', read_only=True)
    pagamento = PagamentoSerializer(source='pagamentos', many=True, read_only=True)
    paciente_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Agendamento
        fields = ['id', 'paciente_id', 'paciente_detail', 'dentista_detail', 'criado_por_detail', 'updated_by_detail',
                  'data_hora', 'motivo', 'status', 'observacoes', 'criado_em', 'atualizado_em', 'pagamento']
        read_only_fields = ['id', 'criado_em', 'atualizado_em', 'updated_by']
    
    def create(self, validated_data):
        paciente_id = validated_data.pop('paciente_id')
        validated_data['paciente_id'] = paciente_id
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        if 'paciente_id' in validated_data:
            instance.paciente_id = validated_data.pop('paciente_id')
        return super().update(instance, validated_data)

# Novos Serializers para Ficha do Paciente

class HistoricoMedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricoMedico
        fields = ['id', 'paciente', 'alergias', 'condicoes_medicas', 'medicamentos', 
                  'criado_em', 'atualizado_em']
        read_only_fields = ['id', 'paciente', 'criado_em', 'atualizado_em']

class PlanoTratamentoSerializer(serializers.ModelSerializer):
    dentista_nome = serializers.CharField(source='dentista.get_full_name', read_only=True)
    
    class Meta:
        model = PlanoTratamento
        fields = ['id', 'paciente', 'dentista', 'dentista_nome', 'prioridade', 
                  'descricao', 'custo_estimado', 'criado_em', 'atualizado_em']
        read_only_fields = ['id', 'criado_em', 'atualizado_em', 'dentista_nome']

class AtendimentoSerializer(serializers.ModelSerializer):
    agendamento_data = serializers.DateTimeField(source='agendamento.data_hora', read_only=True)
    paciente_nome = serializers.CharField(source='agendamento.paciente.nome', read_only=True)
    
    class Meta:
        model = Atendimentos
        fields = ['id', 'agendamento', 'agendamento_data', 'paciente_nome', 'diagnostico', 
                  'tratamento_realizado', 'proximo_passos', 'criado_em', 'atualizado_em']
        read_only_fields = ['id', 'criado_em', 'atualizado_em', 'agendamento_data', 'paciente_nome']

class FichaPacienteSerializer(serializers.ModelSerializer):
    historico_medico = HistoricoMedicoSerializer(read_only=True)
    planos_tratamento = PlanoTratamentoSerializer(many=True, read_only=True)
    consultas = AgendamentoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Paciente
        fields = ['id', 'nome', 'telefone', 'email', 'data_nascimento', 
                  'endereco', 'cidade', 'estado', 'cep', 'observacoes',
                  'historico_medico', 'planos_tratamento', 'consultas']
        read_only_fields = ['id']
