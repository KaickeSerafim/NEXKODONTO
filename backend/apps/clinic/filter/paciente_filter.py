import django_filters
from ..models import Paciente

class PacienteFilter(django_filters.FilterSet):
    nome = django_filters.CharFilter(field_name='nome', lookup_expr='icontains')
    cpf = django_filters.CharFilter(field_name='cpf', lookup_expr='icontains')
    
    class Meta:
        model = Paciente
        fields = ['nome', 'cpf']
