from django.contrib import admin
from .models import Paciente, Agendamento, Procedimento
from .signals import set_current_user

@admin.register(Paciente)
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('nome', 'telefone', 'email', 'dentista')
    list_filter = ('dentista',)
    search_fields = ('nome', 'telefone', 'email')

@admin.register(Agendamento)
class AgendamentoAdmin(admin.ModelAdmin):
    list_display = ('paciente', 'dentista', 'data_hora', 'status', 'motivo', 'updated_by', 'procedimento')
    list_filter = ('status', 'dentista', 'data_hora')
    search_fields = ('paciente__nome', 'motivo')
    date_hierarchy = 'data_hora'
    readonly_fields = ('criado_por', 'updated_by', 'criado_em', 'atualizado_em')
    
    def save_model(self, request, obj, form, change):
        set_current_user(request.user)
        super().save_model(request, obj, form, change)

@admin.register(Procedimento)
class ProcedimentoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'duracao_minutos', 'preco_base', 'dentista')
    list_filter = ('dentista',)
    search_fields = ('nome',)
    date_hierarchy = 'criado_em'
   
    def save_model(self, request, obj, form, change):
        set_current_user(request.user)
        super().save_model(request, obj, form, change)

