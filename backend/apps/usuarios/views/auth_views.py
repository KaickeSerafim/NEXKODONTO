from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rolepermissions.checkers import get_user_roles
from rest_framework import status
from apps.utils.response_builder import ResponseBuilder
from ..serializers import CreateUserSerializer

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
