from django.urls import path
from .views import (
    PacienteListCreateView,
    PacienteDetailView,
    AgendamentoListCreateView,
    AgendamentoDetailView,
    HistoricoMedicoDetailView,
    PlanoTratamentoListCreateView,
    PlanoTratamentoDetailView,
    AtendimentosListView,
    FichaPacienteView,
    DesmarcarAgendamentoView,
    ProcedimentoListCreateView,
    ProcedimentoDetailView,
    DisponibilidadeView,
)
from .views.dashboard_views import DashboardStatsView

urlpatterns = [
    # Pacientes
    path('pacientes/', PacienteListCreateView.as_view(), name='paciente-list-create'),
    path('pacientes/<int:pk>/', PacienteDetailView.as_view(), name='paciente-detail'),
    
    # Procedimentos
    path('procedimentos/', ProcedimentoListCreateView.as_view(), name='procedimento-list-create'),
    path('procedimentos/<int:pk>/', ProcedimentoDetailView.as_view(), name='procedimento-detail'),

    # Dashboard
    path('dashboard/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    
    # Agendamentos
    path('agendamentos/', AgendamentoListCreateView.as_view(), name='agendamento-list-create'),
    path('agendamentos/<int:pk>/', AgendamentoDetailView.as_view(), name='agendamento-detail'),
    path('agendamentos/desmarcar/', DesmarcarAgendamentoView.as_view(), name='agendamento-desmarcar'),
    path('agendamentos/disponibilidade/', DisponibilidadeView.as_view(), name='agendamento-disponibilidade'),
    
    # Ficha do Paciente
    path('pacientes/<int:pk>/ficha/', FichaPacienteView.as_view(), name='ficha-paciente'),
    path('pacientes/<int:paciente_id>/historico-medico/', HistoricoMedicoDetailView.as_view(), name='historico-medico'),
    path('pacientes/<int:paciente_id>/planos-tratamento/', PlanoTratamentoListCreateView.as_view(), name='planos-tratamento-list'),
    path('planos-tratamento/<int:pk>/', PlanoTratamentoDetailView.as_view(), name='plano-tratamento-detail'),
    path('pacientes/<int:paciente_id>/atendimentos/', AtendimentosListView.as_view(), name='atendimentos-list'),
]

