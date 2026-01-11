import django_filters
from ..models import Procedimento

class ProcedimentoFilter(django_filters.FilterSet):
    nome = django_filters.CharFilter(field_name='nome', lookup_expr='icontains')
    
    class Meta:
        model = Procedimento
        fields = ['nome']
