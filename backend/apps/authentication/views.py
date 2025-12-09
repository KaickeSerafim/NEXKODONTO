from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from apps.utils.response_builder import ResponseBuilder
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.exceptions import TokenError


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(email=email, password=password)
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
    

class RefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh")  # ⬅️ pegar o refresh token
        if not refresh_token:
            return ResponseBuilder().error("Refresh token não encontrado.").with_status(400).to_response()

        try:
            refresh = RefreshToken(refresh_token)
            new_access = str(refresh.access_token)

            response = ResponseBuilder().success("Novo access token gerado.").to_response()
            response.set_cookie(
                key="access",
                value=new_access,
                httponly=True,
                secure=False,
                samesite="Lax",
                path="/",
            )
            return response
        except TokenError:
            return ResponseBuilder().error("Refresh token inválido ou expirado.").with_status(401).to_response()


class LogoutView(APIView):
    def post(self, request):
        # Para logout via cookie, apenas limpar o cookie do JWT
        response = (
            ResponseBuilder()
            .success("Logout realizado com sucesso.")
            .to_response()
        )
        response.delete_cookie("access")
        response.delete_cookie("refresh")  # ⬅️ nome do cookie que você usa
        return response