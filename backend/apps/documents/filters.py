import django_filters
from .models import PacienteDocumento
from datetime import datetime

class PacienteDocumentoFilter(django_filters.FilterSet):
    tipo = django_filters.CharFilter(field_name='tipo', lookup_expr='exact')
    paciente = django_filters.NumberFilter(field_name='paciente__id')
    agendamento = django_filters.NumberFilter(field_name='agendamento__id')
    data_inicio = django_filters.DateFilter(field_name='criado_em', lookup_expr='gte')
    data_fim = django_filters.DateFilter(field_name='criado_em', lookup_expr='lte')
    
    class Meta:
        model = PacienteDocumento
        fields = ['tipo', 'paciente', 'agendamento']
