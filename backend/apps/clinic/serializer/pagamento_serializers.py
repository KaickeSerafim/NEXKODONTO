from rest_framework import serializers
from apps.billing.models import Pagamento

class PagamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagamento
        fields = ['id', 'agendamento', 'status', 'pago_em']
        read_only_fields = ['id']
