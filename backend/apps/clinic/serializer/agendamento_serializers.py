from rest_framework import serializers
from ..models import Agendamento
from apps.usuarios.models import CustomUser
from .paciente_serializers import PacienteSerializer
from .procedimento_serializers import ProcedimentoSerializer
from .pagamento_serializers import PagamentoSerializer

class DentistaSerializer(serializers.ModelSerializer):
    nome_completo = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'nome_completo', 'email']
        read_only_fields = ['id']
    
    def get_nome_completo(self, obj):
        return obj.get_full_name()

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
    procedimento_detail = ProcedimentoSerializer(source='procedimento', read_only=True)
    criado_por_detail = CriadoPorSerializer(source='criado_por', read_only=True)
    updated_by_detail = AtualizadoPorSerializer(source='updated_by', read_only=True)
    pagamento = PagamentoSerializer(source='pagamentos', many=True, read_only=True)
    paciente_id = serializers.IntegerField(write_only=True, required=False)
    procedimento_id = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = Agendamento
        fields = ['id', 'paciente_id', 'paciente_detail', 'dentista_detail', 'criado_por_detail', 'updated_by_detail','procedimento_id','procedimento_detail','data_hora_fim',
                  'data_hora', 'motivo', 'status', 'observacoes', 'criado_em', 'atualizado_em', 'pagamento']
        read_only_fields = ['id', 'criado_em', 'atualizado_em', 'updated_by']
    
    def create(self, validated_data):
        paciente_id = validated_data.pop('paciente_id')
        validated_data['paciente_id'] = paciente_id
        procedimento_id = validated_data.pop('procedimento_id')
        validated_data['procedimento_id'] = procedimento_id
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        if 'paciente_id' in validated_data:
            instance.paciente_id = validated_data.pop('paciente_id')
        if 'procedimento_id' in validated_data:
            instance.procedimento_id = validated_data.pop('procedimento_id')
        return super().update(instance, validated_data)
