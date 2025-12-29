from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Paciente, Agendamento, HistoricoMedico, PlanoTratamento, Atendimentos
from .serializers import (PacienteSerializer, AgendamentoSerializer, HistoricoMedicoSerializer,
                          PlanoTratamentoSerializer, AtendimentoSerializer, FichaPacienteSerializer)
from .serializer.desmarcar_agendamento_serializers import DesmarcarAgendamentoSerializer
from apps.utils.response_builder import ResponseBuilder
from .filters import AgendamentoFilter
from django.utils import timezone
from .signals import set_current_user

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
        filterset = AgendamentoFilter(request.GET, queryset=agendamentos)
        serializer = AgendamentoSerializer(filterset.qs, many=True)
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
            set_current_user(request.user)
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

# Views para Ficha do Paciente

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

class AtendimentosListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, paciente_id):
        try:
            paciente = Paciente.objects.get(pk=paciente_id, dentista=request.user)
            atendimentos = Atendimentos.objects.filter(agendamento__paciente=paciente).order_by('-criado_em')
            serializer = AtendimentoSerializer(atendimentos, many=True)
            return ResponseBuilder().success("Atendimentos listados com sucesso").with_data(serializer.data).to_response()
        except Paciente.DoesNotExist:
            return ResponseBuilder().error("Paciente não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()

class FichaPacienteView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        try:
            paciente = Paciente.objects.get(pk=pk, dentista=request.user)
            serializer = FichaPacienteSerializer(paciente)
            return ResponseBuilder().success("Ficha do paciente encontrada").with_data(serializer.data).to_response()
        except Paciente.DoesNotExist:
            return ResponseBuilder().error("Paciente não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()

class DesmarcarAgendamentoView(APIView):
    """
    View para desmarcar um ou múltiplos agendamentos.
    Recebe o ID do agendamento ou uma lista de IDs via POST e processa a desmarcação.
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = DesmarcarAgendamentoSerializer(data=request.data)
        
        if not serializer.is_valid():
            return ResponseBuilder().error("Dados inválidos").with_errors(serializer.errors).to_response()
        
        # Processa a desmarcação
        try:
            resultado = serializer.save(usuario=request.user, dentista=request.user)
            
            # Verifica se houve algum sucesso
            if resultado['total_processados'] == 0:
                # Todos falharam
                return ResponseBuilder().error(
                    "Nenhum agendamento foi desmarcado"
                ).with_data(resultado).with_status(status.HTTP_400_BAD_REQUEST).to_response()
            
            # Verifica se houve algum erro
            if resultado['total_erros'] > 0:
                # Sucesso parcial
                mensagem = f"{resultado['total_processados']} agendamento(s) desmarcado(s) com sucesso. {resultado['total_erros']} erro(s) encontrado(s)."
                return ResponseBuilder().success(mensagem).with_data(resultado).to_response()
            
            # Todos foram processados com sucesso
            mensagem = f"{resultado['total_processados']} agendamento(s) desmarcado(s) com sucesso"
            return ResponseBuilder().success(mensagem).with_data(resultado).to_response()
        
        except Exception as e:
            return ResponseBuilder().error(
                f"Erro ao desmarcar agendamento(s): {str(e)}"
            ).with_status(status.HTTP_500_INTERNAL_SERVER_ERROR).to_response()
