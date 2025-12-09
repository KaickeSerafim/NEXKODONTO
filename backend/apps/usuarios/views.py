from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rolepermissions.checkers import get_user_roles
from rolepermissions.permissions import available_perm_status
from apps.utils.response_builder import ResponseBuilder


class UserMe(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Pega os roles do usuário
        roles = [role.get_name() for role in get_user_roles(user)]

        # Pega todas as permissões do usuário (somente as ativas)
        permissions_dict = available_perm_status(user)
        permissions = [perm for perm, granted in permissions_dict.items() if granted]

        data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "roles": roles,
            "permissions": permissions,
        }

        return (
            ResponseBuilder()
            .success("Usuário autenticado.")
            .with_data(data)
            .to_response()
        )
