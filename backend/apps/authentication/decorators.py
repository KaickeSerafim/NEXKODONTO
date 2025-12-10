from functools import wraps
from rest_framework import status
from apps.utils.response_builder import ResponseBuilder

def require_permission(permission_name):
    """
    Decorator que verifica se o usuário possui a permissão requerida.
    Retorna ResponseBuilder se não tiver.
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapped(request, *args, **kwargs):
            user = getattr(request, "user", None)
            if not user or not getattr(user, "_permissions", {}):
                return ResponseBuilder().error("Usuário não autenticado.").with_status(status.HTTP_401_UNAUTHORIZED).to_response()

            if not user._permissions.get(permission_name, False):
                return ResponseBuilder().error("Permissão negada.").with_status(status.HTTP_403_FORBIDDEN).to_response()

            return view_func(request, *args, **kwargs)
        return wrapped
    return decorator
