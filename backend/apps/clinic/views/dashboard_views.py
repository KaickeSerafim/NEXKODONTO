from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.utils import timezone
from django.db.models import Count, Q
from datetime import timedelta
from ..models import Agendamento
from ..serializer.agendamento_minimal_serializers import AgendamentoDashboardSerializer
from apps.utils.response_builder import ResponseBuilder


class DashboardStatsView(APIView):
    """
    View específica para o Dashboard.
    Retorna estatísticas agregadas e próximos atendimentos de forma otimizada.
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        hoje = timezone.now().date()
        inicio_mes = hoje.replace(day=1)
        fim_mes = (inicio_mes + timedelta(days=32)).replace(day=1) - timedelta(days=1)
        
        # Filtra agendamentos do dentista logado
        base_queryset = Agendamento.objects.filter(dentista=request.user)
        
        # Estatísticas agregadas
        stats = {
            # Total de pacientes únicos
            'total_pacientes': base_queryset.values('paciente').distinct().count(),
            
            # Consultas de hoje
            'consultas_hoje': base_queryset.filter(
                data_hora__date=hoje,
                status__in=['agendada', 'confirmada', 'pendente']
            ).count(),
            
            # Pendentes (futuros não confirmados)
            'pendentes': base_queryset.filter(
                data_hora__gte=timezone.now(),
                status__in=['agendada', 'pendente']
            ).count(),
            
            # Receita mensal estimada (agendamentos confirmados do mês)
            'receita_mensal_estimada': self._calcular_receita_estimada(
                base_queryset.filter(
                    data_hora__date__gte=inicio_mes,
                    data_hora__date__lte=fim_mes,
                    status__in=['confirmada', 'concluida']
                )
            ),
        }
        
        # Próximos atendimentos (limitado a 10 para performance)
        proximos_agendamentos = base_queryset.filter(
            data_hora__gte=timezone.now()
        ).select_related(
            'paciente',
            'procedimento',
            'criado_por',
            'updated_by'
        ).prefetch_related(
            'pagamentos'
        ).order_by('data_hora')[:10]
        
        serializer = AgendamentoDashboardSerializer(proximos_agendamentos, many=True)
        
        return ResponseBuilder().success(
            "Dados do dashboard carregados com sucesso"
        ).with_data({
            'stats': stats,
            'proximos_agendamentos': serializer.data
        }).to_response()
    
    def _calcular_receita_estimada(self, queryset):
        """
        Calcula receita estimada baseada nos procedimentos agendados.
        """
        total = 0
        for agendamento in queryset.select_related('procedimento'):
            if agendamento.procedimento:
                total += float(agendamento.procedimento.preco_base)
        return f"R$ {total:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
