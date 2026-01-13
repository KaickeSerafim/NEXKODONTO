from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.utils import timezone
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
    
    # Força a serialização no horário local (América/São Paulo) definido no settings
    data_hora = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", required=False)
    data_hora_fim = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", read_only=True)
    
    class Meta:
        model = Agendamento
        fields = ['id', 'paciente_id', 'paciente_detail', 'dentista_detail', 'criado_por_detail', 'updated_by_detail','procedimento_id','procedimento_detail','data_hora_fim',
                  'data_hora', 'valor', 'duracao_estimada', 'motivo', 'status', 'observacoes', 'criado_em', 'atualizado_em', 'pagamento']
        read_only_fields = ['id', 'criado_em', 'atualizado_em', 'updated_by']
    
    
    def validate_data_hora(self, value):
        """Valida que data_hora não está no passado"""
        if value < timezone.now():
            raise serializers.ValidationError(
                "A data e hora do agendamento não podem estar no passado."
            )
        return value
    
    def validate(self, data):
        # Se for atualização parcial, precisamos dos dados da instância
        instance = self.instance
        dentista = data.get('dentista', instance.dentista if instance else None)
        data_hora = data.get('data_hora', instance.data_hora if instance else None)
        duracao_estimada = data.get('duracao_estimada', instance.duracao_estimada if instance else None)
        status = data.get('status', instance.status if instance else None)

        # Se não tiver dentista (pode acontecer no create se não passado ainda), 
        # o view cuidará de passar o request.user depois, mas o serializer
        # pode receber se vier no validated_data. No nosso caso, o view passa 
        # depois no save(), então precisamos garantir que temos o dentista aqui.
        if not dentista and 'request' in self.context:
            dentista = self.context['request'].user
            
        # O serializer deve considerar o valor default do model caso status não seja passado
        from ..choices import StatusAgendamento
        if status is None:
            # Se status não veio no payload e não temos instância, assume o default do model
            if not instance:
                status = StatusAgendamento.AGENDADA

        # Apenas valida overlap se o status for um dos que bloqueiam
        status_bloqueantes = [
            StatusAgendamento.AGENDADA,
            StatusAgendamento.CONFIRMADA,
            StatusAgendamento.CONCLUIDA
        ]

        if status in status_bloqueantes and dentista and data_hora and duracao_estimada:
            from ..utils.validators import validate_appointment_overlap
            from rest_framework import serializers as drf_serializers
            try:
                validate_appointment_overlap(
                    dentista=dentista,
                    data_hora=data_hora,
                    duracao_estimada=duracao_estimada,
                    exclude_id=instance.id if instance else None
                )
            except ValidationError as e:
                raise drf_serializers.ValidationError(e.message)

        return data

    def create(self, validated_data):
        paciente_id = validated_data.pop('paciente_id')
        validated_data['paciente_id'] = paciente_id
        procedimento_id = validated_data.pop('procedimento_id', None)
        if procedimento_id:
            validated_data['procedimento_id'] = procedimento_id
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        if 'paciente_id' in validated_data:
            instance.paciente_id = validated_data.pop('paciente_id')
        if 'procedimento_id' in validated_data:
            instance.procedimento_id = validated_data.pop('procedimento_id')
        return super().update(instance, validated_data)
