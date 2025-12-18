from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Pagamento
from .serializers import PagamentoSerializer
from apps.utils.response_builder import ResponseBuilder


class PagamentoListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Lista todos os pagamentos do dentista autenticado"""
        pagamentos = Pagamento.objects.filter(dentista=request.user).select_related(
            'paciente', 'dentista', 'agendamento'
        ).order_by('-pago_em')
        serializer = PagamentoSerializer(pagamentos, many=True, context={'request': request})
        return ResponseBuilder().success("Pagamentos listados com sucesso").with_data(serializer.data).to_response()
    
    def post(self, request):
        """Cria um novo pagamento"""
        serializer = PagamentoSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(dentista=request.user)
            return ResponseBuilder().created("Pagamento criado com sucesso").with_data(serializer.data).to_response()
        return ResponseBuilder().error("Erro ao criar pagamento").with_errors(serializer.errors).to_response()


class PagamentoDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        """Retorna detalhes de um pagamento específico"""
        try:
            pagamento = Pagamento.objects.select_related(
                'paciente', 'dentista', 'agendamento'
            ).get(pk=pk, dentista=request.user)
            serializer = PagamentoSerializer(pagamento, context={'request': request})
            return ResponseBuilder().success("Pagamento encontrado").with_data(serializer.data).to_response()
        except Pagamento.DoesNotExist:
            return ResponseBuilder().error("Pagamento não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
    
    def put(self, request, pk):
        """Atualiza um pagamento existente"""
        try:
            pagamento = Pagamento.objects.get(pk=pk, dentista=request.user)
            serializer = PagamentoSerializer(pagamento, data=request.data, partial=True, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return ResponseBuilder().success("Pagamento atualizado com sucesso").with_data(serializer.data).to_response()
            return ResponseBuilder().error("Erro ao atualizar pagamento").with_errors(serializer.errors).to_response()
        except Pagamento.DoesNotExist:
            return ResponseBuilder().error("Pagamento não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()
    
    def delete(self, request, pk):
        """Deleta um pagamento"""
        try:
            pagamento = Pagamento.objects.get(pk=pk, dentista=request.user)
            pagamento.delete()
            return ResponseBuilder().success("Pagamento deletado com sucesso").with_status(status.HTTP_204_NO_CONTENT).to_response()
        except Pagamento.DoesNotExist:
            return ResponseBuilder().error("Pagamento não encontrado").with_status(status.HTTP_404_NOT_FOUND).to_response()


class PagamentoPorAgendamentoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, agendamento_id):
        """Lista todos os pagamentos de um agendamento específico"""
        pagamentos = Pagamento.objects.filter(
            agendamento_id=agendamento_id,
            dentista=request.user
        ).select_related('paciente', 'dentista', 'agendamento').order_by('-pago_em')
        serializer = PagamentoSerializer(pagamentos, many=True, context={'request': request})
        return ResponseBuilder().success("Pagamentos do agendamento listados com sucesso").with_data(serializer.data).to_response()


class PagamentoPorPacienteView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, paciente_id):
        """Lista todos os pagamentos de um paciente específico"""
        pagamentos = Pagamento.objects.filter(
            paciente_id=paciente_id,
            dentista=request.user
        ).select_related('paciente', 'dentista', 'agendamento').order_by('-pago_em')
        serializer = PagamentoSerializer(pagamentos, many=True, context={'request': request})
        return ResponseBuilder().success("Pagamentos do paciente listados com sucesso").with_data(serializer.data).to_response()
