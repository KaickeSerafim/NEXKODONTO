from django.urls import path
from .views import PacienteDocumentoListCreateView, PacienteDocumentoDetailView

urlpatterns = [
    path('', PacienteDocumentoListCreateView.as_view(), name='documento-list-create'),
    path('<int:pk>/', PacienteDocumentoDetailView.as_view(), name='documento-detail'),
]
