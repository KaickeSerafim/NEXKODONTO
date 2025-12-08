from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rolepermissions.checkers import get_user_roles, get_user_permissions
from .response_builder import ResponseBuilder


class UserMe(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        roles = [role.get_name() for role in get_user_roles(user)]
        permissions = list(get_user_permissions(user))

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
