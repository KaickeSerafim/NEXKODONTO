from rest_framework import serializers
from rolepermissions.roles import assign_role
from rolepermissions.checkers import get_user_roles
from rolepermissions.permissions import available_perm_status
from apps.usuarios.models import CustomUser

# Serializer para criar usuário
class CreateUserSerializer(serializers.ModelSerializer):
    tipo_usuario = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "id", "username", "email", "password", "cro", "foto",
            "banco", "agencia", "conta", "pix", "tipo_usuario"
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        tipo_usuario = validated_data.pop("tipo_usuario")
        password = validated_data.pop("password")

        # Cria usuário
        user = CustomUser.objects.create_user(password=password, **validated_data)

        # Atribui role
        if tipo_usuario == "dentista":
            assign_role(user, "dentista")
        elif tipo_usuario == "secretaria":
            assign_role(user, "secretaria")
        elif tipo_usuario == "admin":
            assign_role(user, "admin_sistema")
        else:
            raise serializers.ValidationError("Tipo de usuário inválido.")

        return user


# Serializer para UserMe
class UserMeSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField()
    permissions = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "roles", "permissions"]

    def get_roles(self, user):
        return [role.get_name() for role in get_user_roles(user)]

    def get_permissions(self, user):
        perms = available_perm_status(user)
        return [perm for perm, granted in perms.items() if granted]
