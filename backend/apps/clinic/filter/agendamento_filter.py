import django_filters
from ..models import Agendamento
from datetime import datetime

class AgendamentoFilter(django_filters.FilterSet):
    motivo = django_filters.CharFilter(field_name='motivo', lookup_expr='icontains')
    pagamento = django_filters.CharFilter(method='filter_pagamento')
    periodo = django_filters.CharFilter(method='filter_periodo')
    futuros = django_filters.BooleanFilter(method='filter_futuros')
    
    class Meta:
        model = Agendamento
        fields = ['motivo', 'status']
    
    def filter_pagamento(self, queryset, name, value):
        if value:
            return queryset.filter(pagamentos__status=value).distinct()
        return queryset
    
    def filter_periodo(self, queryset, name, value):
        hoje = datetime.now().date()
        if value and value.isdigit():
            hora = int(value)
            return queryset.filter(
                data_hora__date=hoje,
                data_hora__hour=hora
            )
        return queryset
    
    def filter_futuros(self, queryset, name, value):
        if value:
            from django.utils import timezone
            return queryset.filter(data_hora__gte=timezone.now())
        return queryset
