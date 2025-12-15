from django.urls import path

from .views import CreateUserView, UserMe, PacienteListView, UpdateUserView


urlpatterns = [
    path('user/me/', UserMe.as_view(), name='user'),
    path('user/register/', CreateUserView.as_view(), name='register_user'),
    path('user/update/', UpdateUserView.as_view(), name='update_user'),
    path("pacientes/", PacienteListView.as_view(), name="pacientes_list"),
]
 