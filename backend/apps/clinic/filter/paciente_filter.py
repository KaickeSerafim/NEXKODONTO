from django.db.models import Q
import django_filters
from ..models import Paciente

class PacienteFilter(django_filters.FilterSet):
    nome = django_filters.CharFilter(field_name='nome', lookup_expr='icontains')
    cpf = django_filters.CharFilter(field_name='cpf', lookup_expr='icontains')
    search = django_filters.CharFilter(method='filter_search')

    class Meta:
        model = Paciente
        fields = ['nome', 'cpf', 'search']

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(nome__icontains=value) | Q(cpf__icontains=value)
        )
