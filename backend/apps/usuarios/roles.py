from rolepermissions.roles import AbstractUserRole

class Dentista(AbstractUserRole):
    available_permissions = {
        "ver_dashboard": True,
        "gerenciar_pacientes": True,
        "gerenciar_agenda": True,
        "ver_faturamento": True,
    }


class Secretaria(AbstractUserRole):
    available_permissions = {
        "gerenciar_pacientes": True,
        "gerenciar_agenda": True,
        "ver_dashboard": False,
        "ver_faturamento": False,
    }


class AdminSistema(AbstractUserRole):
    available_permissions = {
        "gerenciar_usuarios": True,
        "gerenciar_planos": True,
        "ver_tudo": True,
    }
