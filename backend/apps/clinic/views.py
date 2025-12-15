from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Paciente, Agendamento
from .serializers import PacienteSerializer, AgendamentoSerializer
from apps.utils.response_builder import ResponseBuilder

class PacienteListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        pacientes = Paciente.objects.filter(dentista=request.user)
        serializer = PacienteSerializer(pacientes, many=True)
        return ResponseBuilder().success("Pacientes listados com sucesso").with_data(serializer.data).to_response()
    
    def post(self, request):
        serializer = PacienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(dentista=request.user)
            return ResponseBuilder().created("Paciente criado com sucesso").with_data(serializer.data).to_response()
        return ResponseBuilder().error("Erro ao criar paciente").with_errors(serializer.errors).to_response()

class PacienteDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        try:
            paciente = Paciente.objects.get(pk=pk, dentista=request.user)
            serializer = PacienteSerializer(paciente)
            return ResponseBuilder().success("Paciente encontrado").with_data(serializer.data).to_response()
        except Paciente.DoesNotExist:
            return ResponseBuilder().error("Paciente não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
    
    def put(self, request, pk):
        try:
            paciente = Paciente.objects.get(pk=pk, dentista=request.user)
            serializer = PacienteSerializer(paciente, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return ResponseBuilder().success("Paciente atualizado com sucesso").with_data(serializer.data).to_response()
            return ResponseBuilder().error("Erro ao atualizar paciente").with_errors(serializer.errors).to_response()
        except Paciente.DoesNotExist:
            return ResponseBuilder().error("Paciente não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
    
    def delete(self, request, pk):
        try:
            paciente = Paciente.objects.get(pk=pk, dentista=request.user)
            paciente.delete()
            return ResponseBuilder().success("Paciente deletado com sucesso").with_status(status.HTTP_204_NO_CONTENT).to_response()
        except Paciente.DoesNotExist:
            return ResponseBuilder().error("Paciente não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()

class AgendamentoListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        agendamentos = Agendamento.objects.filter(dentista=request.user)
        serializer = AgendamentoSerializer(agendamentos, many=True)
        return ResponseBuilder().success("Agendamentos listados com sucesso").with_data(serializer.data).to_response()
    
    def post(self, request):
        serializer = AgendamentoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(dentista=request.user, criado_por=request.user)
            return ResponseBuilder().created("Agendamento criado com sucesso").with_data(serializer.data).to_response()
        return ResponseBuilder().error("Erro ao criar agendamento").with_errors(serializer.errors).to_response()

class AgendamentoDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        try:
            agendamento = Agendamento.objects.get(pk=pk, dentista=request.user)
            serializer = AgendamentoSerializer(agendamento)
            return ResponseBuilder().success("Agendamento encontrado").with_data(serializer.data).to_response()
        except Agendamento.DoesNotExist:
            return ResponseBuilder().error("Agendamento não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
    
    def put(self, request, pk):
        try:
            agendamento = Agendamento.objects.get(pk=pk, dentista=request.user)
            serializer = AgendamentoSerializer(agendamento, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return ResponseBuilder().success("Agendamento atualizado com sucesso").with_data(serializer.data).to_response()
            return ResponseBuilder().error("Erro ao atualizar agendamento").with_errors(serializer.errors).to_response()
        except Agendamento.DoesNotExist:
            return ResponseBuilder().error("Agendamento não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
    
    def delete(self, request, pk):
        try:
            agendamento = Agendamento.objects.get(pk=pk, dentista=request.user)
            agendamento.delete()
            return ResponseBuilder().success("Agendamento deletado com sucesso").with_status(status.HTTP_204_NO_CONTENT).to_response()
        except Agendamento.DoesNotExist:
            return ResponseBuilder().error("Agendamento não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
