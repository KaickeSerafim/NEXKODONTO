from django.urls import path

from .views import (
    CreateUserView, UserMe, PacienteListView, UpdateUserView,
    BloqueioAgendaListView, BloquearDiaView, DesbloquearDiaView
)


urlpatterns = [
    path('user/me/', UserMe.as_view(), name='user'),
    path('user/register/', CreateUserView.as_view(), name='register_user'),
    path('user/update/', UpdateUserView.as_view(), name='update_user'),
    path("pacientes/", PacienteListView.as_view(), name="pacientes_list"),
    
    # Bloqueios de Agenda
    path('bloqueios/', BloqueioAgendaListView.as_view(), name='bloqueio-agenda-list'),
    path('bloqueios/bloquear/', BloquearDiaView.as_view(), name='bloquear-dia'),
    path('bloqueios/desbloquear/', DesbloquearDiaView.as_view(), name='desbloquear-dia'),
]

 