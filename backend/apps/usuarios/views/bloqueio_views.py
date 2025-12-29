from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from apps.utils.response_builder import ResponseBuilder
from ..models import BloqueioAgenda
from ..serializers import BloqueioAgendaSerializer
from django.utils import timezone

class BloqueioAgendaListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Lista apenas bloqueios futuros ou de hoje
        bloqueios = BloqueioAgenda.objects.filter(
            dentista=request.user,
            data__gte=timezone.now().date()
        ).order_by('data')
        serializer = BloqueioAgendaSerializer(bloqueios, many=True)
        return ResponseBuilder().success("Bloqueios listados com sucesso").with_data(serializer.data).to_response()

class BloquearDiaView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        data = request.data.get('data')
        if not data:
            return ResponseBuilder().error("A data é obrigatória").with_status(status.HTTP_400_BAD_REQUEST).to_response()
            
        # Verifica se já existe um bloqueio TOTAL para esse dia
        if BloqueioAgenda.objects.filter(dentista=request.user, data=data, hora_inicio__isnull=True).exists():
            return ResponseBuilder().error("Este dia já possui um bloqueio total").with_status(status.HTTP_400_BAD_REQUEST).to_response()
            
        serializer = BloqueioAgendaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(dentista=request.user)
            return ResponseBuilder().created("Dia bloqueado com sucesso").with_data(serializer.data).to_response()
        return ResponseBuilder().error("Erro ao bloquear dia").with_errors(serializer.errors).to_response()

class DesbloquearDiaView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        data = request.data.get('data')
        if not data:
            return ResponseBuilder().error("A data é obrigatória").with_status(status.HTTP_400_BAD_REQUEST).to_response()
            
        try:
            bloqueio = BloqueioAgenda.objects.get(dentista=request.user, data=data)
            bloqueio.delete()
            return ResponseBuilder().success("Dia desbloqueado com sucesso").to_response()
        except BloqueioAgenda.DoesNotExist:
            return ResponseBuilder().error("Bloqueio não encontrado para esta data").with_status(status.HTTP_404_NOT_FOUND).to_response()
