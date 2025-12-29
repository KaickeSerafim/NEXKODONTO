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
)

urlpatterns = [
    # Pacientes
    path('pacientes/', PacienteListCreateView.as_view(), name='paciente-list-create'),
    path('pacientes/<int:pk>/', PacienteDetailView.as_view(), name='paciente-detail'),
    
    # Agendamentos
    path('agendamentos/', AgendamentoListCreateView.as_view(), name='agendamento-list-create'),
    path('agendamentos/<int:pk>/', AgendamentoDetailView.as_view(), name='agendamento-detail'),
    path('agendamentos/desmarcar/', DesmarcarAgendamentoView.as_view(), name='agendamento-desmarcar'),
    
    # Ficha do Paciente
    path('pacientes/<int:pk>/ficha/', FichaPacienteView.as_view(), name='ficha-paciente'),
    path('pacientes/<int:paciente_id>/historico-medico/', HistoricoMedicoDetailView.as_view(), name='historico-medico'),
    path('pacientes/<int:paciente_id>/planos-tratamento/', PlanoTratamentoListCreateView.as_view(), name='planos-tratamento-list'),
    path('planos-tratamento/<int:pk>/', PlanoTratamentoDetailView.as_view(), name='plano-tratamento-detail'),
    path('pacientes/<int:paciente_id>/atendimentos/', AtendimentosListView.as_view(), name='atendimentos-list'),
]

