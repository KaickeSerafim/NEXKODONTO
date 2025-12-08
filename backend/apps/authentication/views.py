from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .response_builder import ResponseBuilder
from rest_framework.permissions import AllowAny


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user is None:
            return (
                ResponseBuilder()
                .error("Credenciais inválidas.")
                .with_status(400)
                .to_response()
            )

        refresh = RefreshToken.for_user(user)

        response = (
            ResponseBuilder()
            .success("Login realizado com sucesso.")
            .to_response()
        )

        # Cookies HttpOnly
        response.set_cookie(
            key="refresh",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite="Lax",
            path="/",
        )
        response.set_cookie(
            key="access",
            value=str(refresh.access_token),
            httponly=True,
            secure=False,
            samesite="Lax",
            path="/",
        )

        return response
