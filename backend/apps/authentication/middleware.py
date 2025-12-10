from rolepermissions.checkers import get_user_roles
from rolepermissions.permissions import available_perm_status

class UserRolePermissionMiddleware:
    """
    Middleware para adicionar roles e permissões ao request.user.
    Retorna resposta com ResponseBuilder caso o usuário não esteja autenticado.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        user = getattr(request, "user", None)
        if user and user.is_authenticated:
            # Adiciona roles
            user._roles = [role.get_name() for role in get_user_roles(user)]
            # Adiciona permissões
            perms = available_perm_status(user)
            user._permissions = {perm: granted for perm, granted in perms.items() if granted}
        else:
            # Opcional: você pode retornar erro diretamente aqui se quiser
            pass

        response = self.get_response(request)
        return response
