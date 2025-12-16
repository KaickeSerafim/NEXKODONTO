from django.urls import path
from .views import PacienteDocumentoListCreateView, PacienteDocumentoDetailView, DownloadDocumentoView

urlpatterns = [
    path('documentos/', PacienteDocumentoListCreateView.as_view(), name='documento-list-create'),
    path('documentos/<int:pk>/', PacienteDocumentoDetailView.as_view(), name='documento-detail'),
    path('documentos/<int:pk>/download/', DownloadDocumentoView.as_view(), name='documento-download'),
]
