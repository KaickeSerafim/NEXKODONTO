from django.contrib import admin
from .models import Paciente, Agendamento

@admin.register(Paciente)
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('nome', 'telefone', 'email', 'dentista')
    list_filter = ('dentista',)
    search_fields = ('nome', 'telefone', 'email')

@admin.register(Agendamento)
class AgendamentoAdmin(admin.ModelAdmin):
    list_display = ('paciente', 'dentista', 'data_hora', 'status', 'motivo')
    list_filter = ('status', 'dentista', 'data_hora')
    search_fields = ('paciente__nome', 'motivo')
    date_hierarchy = 'data_hora'
