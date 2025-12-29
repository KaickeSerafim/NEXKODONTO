from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..models import Paciente, HistoricoMedico, PlanoTratamento
from ..serializers import (HistoricoMedicoSerializer, PlanoTratamentoSerializer, FichaPacienteSerializer)
from apps.utils.response_builder import ResponseBuilder

class HistoricoMedicoDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, paciente_id):
        try:
            paciente = Paciente.objects.get(pk=paciente_id, dentista=request.user)
            historico, created = HistoricoMedico.objects.get_or_create(paciente=paciente)
            serializer = HistoricoMedicoSerializer(historico)
            return ResponseBuilder().success("Histórico médico encontrado").with_data(serializer.data).to_response()
        except Paciente.DoesNotExist:
            return ResponseBuilder().error("Paciente não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
    
    def put(self, request, paciente_id):
        try:
            paciente = Paciente.objects.get(pk=paciente_id, dentista=request.user)
            historico, created = HistoricoMedico.objects.get_or_create(paciente=paciente)
            serializer = HistoricoMedicoSerializer(historico, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return ResponseBuilder().success("Histórico médico atualizado com sucesso").with_data(serializer.data).to_response()
            return ResponseBuilder().error("Erro ao atualizar histórico médico").with_errors(serializer.errors).to_response()
        except Paciente.DoesNotExist:
            return ResponseBuilder().error("Paciente não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()

class PlanoTratamentoListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, paciente_id):
        try:
            paciente = Paciente.objects.get(pk=paciente_id, dentista=request.user)
            planos = PlanoTratamento.objects.filter(paciente=paciente)
            serializer = PlanoTratamentoSerializer(planos, many=True)
            return ResponseBuilder().success("Planos de tratamento listados com sucesso").with_data(serializer.data).to_response()
        except Paciente.DoesNotExist:
            return ResponseBuilder().error("Paciente não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
    
    def post(self, request, paciente_id):
        try:
            paciente = Paciente.objects.get(pk=paciente_id, dentista=request.user)
            serializer = PlanoTratamentoSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(paciente=paciente, dentista=request.user)
                return ResponseBuilder().created("Plano de tratamento criado com sucesso").with_data(serializer.data).to_response()
            return ResponseBuilder().error("Erro ao criar plano de tratamento").with_errors(serializer.errors).to_response()
        except Paciente.DoesNotExist:
            return ResponseBuilder().error("Paciente não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()

class PlanoTratamentoDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        try:
            plano = PlanoTratamento.objects.get(pk=pk, paciente__dentista=request.user)
            serializer = PlanoTratamentoSerializer(plano)
            return ResponseBuilder().success("Plano de tratamento encontrado").with_data(serializer.data).to_response()
        except PlanoTratamento.DoesNotExist:
            return ResponseBuilder().error("Plano de tratamento não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
    
    def put(self, request, pk):
        try:
            plano = PlanoTratamento.objects.get(pk=pk, paciente__dentista=request.user)
            serializer = PlanoTratamentoSerializer(plano, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return ResponseBuilder().success("Plano de tratamento atualizado com sucesso").with_data(serializer.data).to_response()
            return ResponseBuilder().error("Erro ao atualizar plano de tratamento").with_errors(serializer.errors).to_response()
        except PlanoTratamento.DoesNotExist:
            return ResponseBuilder().error("Plano de tratamento não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
    
    def delete(self, request, pk):
        try:
            plano = PlanoTratamento.objects.get(pk=pk, paciente__dentista=request.user)
            plano.delete()
            return ResponseBuilder().success("Plano de tratamento deletado com sucesso").with_status(status.HTTP_204_NO_CONTENT).to_response()
        except PlanoTratamento.DoesNotExist:
            return ResponseBuilder().error("Plano de tratamento não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()

class FichaPacienteView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        try:
            paciente = Paciente.objects.get(pk=pk, dentista=request.user)
            serializer = FichaPacienteSerializer(paciente)
            return ResponseBuilder().success("Ficha do paciente encontrada").with_data(serializer.data).to_response()
        except Paciente.DoesNotExist:
            return ResponseBuilder().error("Paciente não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
