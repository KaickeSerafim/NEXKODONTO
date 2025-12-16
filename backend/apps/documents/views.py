from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import PacienteDocumento
from .serializers import PacienteDocumentoSerializer
from .filters import PacienteDocumentoFilter
from apps.utils.response_builder import ResponseBuilder

class PacienteDocumentoListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        documentos = PacienteDocumento.objects.filter(paciente__dentista=request.user)
        filterset = PacienteDocumentoFilter(request.GET, queryset=documentos)
        serializer = PacienteDocumentoSerializer(filterset.qs, many=True)
        return ResponseBuilder().success("Documentos listados com sucesso").with_data(serializer.data).to_response()
    
    def post(self, request):
        serializer = PacienteDocumentoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(enviado_por=request.user)
            return ResponseBuilder().created("Documento criado com sucesso").with_data(serializer.data).to_response()
        return ResponseBuilder().error("Erro ao criar documento").with_errors(serializer.errors).to_response()

class PacienteDocumentoDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        try:
            documento = PacienteDocumento.objects.get(pk=pk, paciente__dentista=request.user)
            serializer = PacienteDocumentoSerializer(documento)
            return ResponseBuilder().success("Documento encontrado").with_data(serializer.data).to_response()
        except PacienteDocumento.DoesNotExist:
            return ResponseBuilder().error("Documento não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
    
    def put(self, request, pk):
        try:
            documento = PacienteDocumento.objects.get(pk=pk, paciente__dentista=request.user)
            serializer = PacienteDocumentoSerializer(documento, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return ResponseBuilder().success("Documento atualizado com sucesso").with_data(serializer.data).to_response()
            return ResponseBuilder().error("Erro ao atualizar documento").with_errors(serializer.errors).to_response()
        except PacienteDocumento.DoesNotExist:
            return ResponseBuilder().error("Documento não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
    
    def delete(self, request, pk):
        try:
            documento = PacienteDocumento.objects.get(pk=pk, paciente__dentista=request.user)
            documento.delete()
            return ResponseBuilder().success("Documento deletado com sucesso").with_status(status.HTTP_204_NO_CONTENT).to_response()
        except PacienteDocumento.DoesNotExist:
            return ResponseBuilder().error("Documento não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
