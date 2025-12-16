from django.contrib import admin
from .models import PacienteDocumento

@admin.register(PacienteDocumento)
class PacienteDocumentoAdmin(admin.ModelAdmin):
    list_display = ['paciente', 'tipo', 'agendamento', 'enviado_por', 'criado_em']
    list_filter = ['tipo', 'criado_em']
    search_fields = ['paciente__nome', 'descricao']
    readonly_fields = ['criado_em', 'enviado_por']
    date_hierarchy = 'criado_em'
