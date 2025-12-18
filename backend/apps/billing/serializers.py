from rest_framework import serializers
from .models import Pagamento
from apps.clinic.models import Paciente, Agendamento
from django.contrib.auth import get_user_model

User = get_user_model()


class PagamentoSerializer(serializers.ModelSerializer):
    paciente_nome = serializers.CharField(source='paciente.nome', read_only=True)
    dentista_nome = serializers.CharField(source='dentista.get_full_name', read_only=True)
    
    class Meta:
        model = Pagamento
        fields = [
            'id',
            'paciente',
            'paciente_nome',
            'dentista',
            'dentista_nome',
            'agendamento',
            'valor',
            'status',
            'metodo',
            'comprovante',
            'observacoes',
            'pago_em',
        ]
        read_only_fields = ['id', 'pago_em', 'paciente_nome', 'dentista_nome']
    
    def validate_paciente(self, value):
        """Valida se o paciente pertence ao dentista autenticado"""
        request = self.context.get('request')
        if request and value:
            if value.dentista != request.user:
                raise serializers.ValidationError("Paciente não pertence ao dentista autenticado.")
        return value
    
    def validate_agendamento(self, value):
        """Valida se o agendamento pertence ao dentista autenticado"""
        request = self.context.get('request')
        if request and value:
            if value.dentista != request.user:
                raise serializers.ValidationError("Agendamento não pertence ao dentista autenticado.")
        return value
