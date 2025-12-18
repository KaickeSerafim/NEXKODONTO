from django.urls import path
from .views import (
    PagamentoListCreateView,
    PagamentoDetailView,
    PagamentoPorAgendamentoView,
    PagamentoPorPacienteView,
)

urlpatterns = [
    path('pagamentos/', PagamentoListCreateView.as_view(), name='pagamento-list-create'),
    path('pagamentos/<int:pk>/', PagamentoDetailView.as_view(), name='pagamento-detail'),
    path('pagamentos/agendamento/<int:agendamento_id>/', PagamentoPorAgendamentoView.as_view(), name='pagamento-por-agendamento'),
    path('pagamentos/paciente/<int:paciente_id>/', PagamentoPorPacienteView.as_view(), name='pagamento-por-paciente'),
]
