from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..models import Agendamento
from ..serializers import AgendamentoSerializer
from ..serializer.agendamento_minimal_serializers import AgendamentoMinimalSerializer, AgendamentoDashboardSerializer
from ..serializer.desmarcar_agendamento_serializers import DesmarcarAgendamentoSerializer
from apps.utils.response_builder import ResponseBuilder
from ..filter.agendamento_filter import AgendamentoFilter
from ..signals import set_current_user
from apps.usuarios.models import BloqueioAgenda

class AgendamentoListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Usa serializer minimal para a agenda/calendário (performance)
        # Usa serializer dashboard para próximos atendimentos (dados completos)
        # Usa serializer completo por padrão (backward compatibility)
        
        view_type = request.query_params.get('view', 'full')  # full, minimal, dashboard
        
        agendamentos = Agendamento.objects.filter(dentista=request.user)
        filterset = AgendamentoFilter(request.GET, queryset=agendamentos)
        
        # Seleciona o serializer apropriado baseado no tipo de visualização
        if view_type == 'dashboard':
            # Para dashboard: dados completos com select_related para performance
            qs = filterset.qs.select_related(
                'paciente', 
                'procedimento', 
                'criado_por', 
                'updated_by'
            ).prefetch_related('pagamentos')
            serializer = AgendamentoDashboardSerializer(qs, many=True)
        elif view_type == 'full':
            # Para detalhes completos quando necessário
            serializer = AgendamentoSerializer(filterset.qs, many=True)
        else:  # minimal (padrão para calendário)
            # Para calendário: apenas dados essenciais (melhor performance)
            qs = filterset.qs.select_related('paciente').prefetch_related('pagamentos')
            serializer = AgendamentoMinimalSerializer(qs, many=True)
        
        return ResponseBuilder().success("Agendamentos listados com sucesso").with_data(serializer.data).to_response()
    
    def post(self, request):
        data_hora = request.data.get('data_hora')
        if data_hora:
            try:
                from datetime import datetime
                dt_agendamento = datetime.fromisoformat(data_hora.replace('Z', ''))
                data_agendamento = dt_agendamento.date()
                hora_agendamento = dt_agendamento.time()
                
                # Busca bloqueios para o dia
                bloqueios = BloqueioAgenda.objects.filter(dentista=request.user, data=data_agendamento)
                
                for bloqueio in bloqueios:
                    # Se hora_inicio e hora_fim forem nulos, o dia TODO está bloqueado
                    if bloqueio.hora_inicio is None and bloqueio.hora_fim is None:
                        return ResponseBuilder().error("Este dia está totalmente bloqueado para novos agendamentos").with_status(status.HTTP_400_BAD_REQUEST).to_response()
                    
                    # Se houver horário, verifica se o agendamento cai no intervalo
                    if bloqueio.hora_inicio and bloqueio.hora_fim:
                        if bloqueio.hora_inicio <= hora_agendamento <= bloqueio.hora_fim:
                            return ResponseBuilder().error(f"O horário {hora_agendamento.strftime('%H:%M')} está bloqueado: {bloqueio.motivo or 'Sem motivo'}").with_status(status.HTTP_400_BAD_REQUEST).to_response()
            except (ValueError, IndexError):
                pass
        
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
