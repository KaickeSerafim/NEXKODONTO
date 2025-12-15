from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rolepermissions.checkers import get_user_roles
from rest_framework import status
from apps.utils.response_builder import ResponseBuilder

from apps.authentication.decorators import require_permission

from .serializers import CreateUserSerializer, UserMeSerializer, UpdateUserMeSerializer

class CreateUserView(APIView):
    permission_classes = [AllowAny]

    # 🔹 Ignora autenticação via cookie ou qualquer outro método
    def get_authenticators(self):
        return []

    def post(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if not serializer.is_valid():
            return ResponseBuilder().error("Erro na validação dos dados.") \
                .with_data(serializer.errors) \
                .with_status(status.HTTP_400_BAD_REQUEST) \
                .to_response()

        user = serializer.save()

        # Pega roles do usuário criado
        roles = [role.get_name() for role in get_user_roles(user)]

        return ResponseBuilder().created("Usuário criado com sucesso.") \
            .with_data({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "roles": roles
            }).to_response()

class UserMe(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(request)
        serializer = UserMeSerializer(request.user)
        return ResponseBuilder().success("Usuário autenticado.") \
            .with_data(serializer.data) \
            .to_response()


# Exemplo de view protegida por decorator


class PacienteListView(APIView):
    permission_classes = [IsAuthenticated]

    @require_permission("gerenciar_pacientes")
    def get(self, request):
        # Aqui você colocaria sua lógica real
        pacientes = [{"id": 1, "nome": "João"}]
        return ResponseBuilder().success("Pacientes carregados.") \
            .with_data(pacientes) \
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
