from rolepermissions.roles import AbstractUserRole

class Admin(AbstractUserRole):
    available_permissions = {
        'gerenciar_usuarios': True,
        'ver_financeiro': True,
        'aprovar_jogadores': True,
    }

class Moderador(AbstractUserRole):
    available_permissions = {
        'aprovar_jogadores': True,
    }

class Jogador(AbstractUserRole):
    available_permissions = {
        'ver_dashboard': True,
    }
