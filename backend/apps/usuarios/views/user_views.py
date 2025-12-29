from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from apps.utils.response_builder import ResponseBuilder
from apps.authentication.decorators import require_permission
from ..serializers import UserMeSerializer, UpdateUserMeSerializer

class UserMe(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserMeSerializer(request.user)
        return ResponseBuilder().success("Usuário autenticado.") \
            .with_data(serializer.data) \
            .to_response()

class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UpdateUserMeSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return ResponseBuilder().success("Usuário atualizado com sucesso.") \
                .with_data(serializer.data) \
                .to_response()
        else:
            return ResponseBuilder().error("Erro na atualização do usuário.") \
                .with_data(serializer.errors) \
                .with_status(status.HTTP_400_BAD_REQUEST) \
                .to_response()

class PacienteListView(APIView):
    permission_classes = [IsAuthenticated]

    @require_permission("gerenciar_pacientes")
    def get(self, request):
        # Aqui você colocaria sua lógica real
        pacientes = [{"id": 1, "nome": "João"}]
        return ResponseBuilder().success("Pacientes carregados.") \
            .with_data(pacientes) \
            .to_response()
