from django.contrib import admin
from .models import Pagamento

@admin.register(Pagamento)
class PagamentoAdmin(admin.ModelAdmin):
    list_display = ['paciente', 'dentista', 'valor', 'status', 'metodo', 'pago_em']
    list_filter = ['status', 'metodo', 'pago_em']
    search_fields = ['paciente__nome', 'dentista__username']
    readonly_fields = ['pago_em']
    list_editable = ['status']
