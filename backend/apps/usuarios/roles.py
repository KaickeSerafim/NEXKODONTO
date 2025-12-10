from rolepermissions.roles import AbstractUserRole

class Dentista(AbstractUserRole):
    available_permissions = {
        "utilizar_sistema": False,
        "gerenciar_config_dentista": True,
        "ver_dashboard": True,
        "gerenciar_pacientes": False,
        "gerenciar_agenda": False,
        "gerenciar_secretaria": False,
        "ver_faturamento": False,
    }


class Secretaria(AbstractUserRole):
    available_permissions = {
        "utilizar_sistema": True,
        "gerenciar_pacientes": True,
        "gerenciar_agenda": True,
        "ver_dashboard": True,
    }


class AdminSistema(AbstractUserRole):
    available_permissions = {
        "utilizar_sistema": True,
        "gerenciar_usuarios": True,
        "gerenciar_planos": True,
        "ver_tudo": True,
    }
