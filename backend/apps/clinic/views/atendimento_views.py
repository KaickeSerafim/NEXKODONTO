from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..models import Paciente, Atendimentos
from ..serializers import AtendimentoSerializer
from apps.utils.response_builder import ResponseBuilder

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
