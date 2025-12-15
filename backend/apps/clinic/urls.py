from django.urls import path
from .views import (
    PacienteListCreateView,
    PacienteDetailView,
    AgendamentoListCreateView,
    AgendamentoDetailView,
)

urlpatterns = [
    path('pacientes/', PacienteListCreateView.as_view(), name='paciente-list-create'),
    path('pacientes/<int:pk>/', PacienteDetailView.as_view(), name='paciente-detail'),
    path('agendamentos/', AgendamentoListCreateView.as_view(), name='agendamento-list-create'),
    path('agendamentos/<int:pk>/', AgendamentoDetailView.as_view(), name='agendamento-detail'),
]
