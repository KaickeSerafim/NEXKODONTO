from rest_framework import serializers
from ..models import Agendamento

class AgendamentoMinimalSerializer(serializers.ModelSerializer):
    """
    Serializer minimalista para listagem de agendamentos (Calendário).
    Retorna apenas o essencial para renderizar os "quadradinhos" na agenda.
    ESTRUTURA COMPATÍVEL COM O FRONTEND.
    """
    paciente_detail = serializers.SerializerMethodField()
    pagamento = serializers.SerializerMethodField()
    procedimento_detail = serializers.SerializerMethodField()
    
    class Meta:
        model = Agendamento
        fields = [
            'id', 
            'paciente_detail', 
            'procedimento_detail',
            'data_hora', 
            'status',
            'pagamento'
        ]
        read_only_fields = fields
    
    def get_paciente_detail(self, obj):
        return {
            'id': obj.paciente.id,
            'nome': obj.paciente.nome
        }
    
    def get_procedimento_detail(self, obj):
        if obj.procedimento:
            return {
                'id': obj.procedimento.id,
                'nome': obj.procedimento.nome
            }
        return None

    def get_pagamento(self, obj):

        """Retorna apenas o status do primeiro pagamento se existir em um array"""
        pagamento = obj.pagamentos.first()
        if pagamento:
            return [{
                'id': pagamento.id, 
                'status': pagamento.status, 
                'pago_em': pagamento.pago_em
            }]
        return []




class AgendamentoDashboardSerializer(serializers.ModelSerializer):
    """
    Serializer para o Dashboard com dados completos para exibição detalhada.
    Inclui todos os dados necessários para visualização rica de próximos atendimentos.
    """
    paciente_detail = serializers.SerializerMethodField()
    procedimento_detail = serializers.SerializerMethodField()
    criado_por_detail = serializers.SerializerMethodField()
    updated_by_detail = serializers.SerializerMethodField()
    pagamento = serializers.SerializerMethodField()
    
    class Meta:
        model = Agendamento
        fields = [
            'id',
            'paciente_detail',
            'procedimento_detail',
            'criado_por_detail',
            'updated_by_detail',
            'data_hora',
            'data_hora_fim',
            'motivo',
            'status',
            'observacoes',
            'criado_em',
            'atualizado_em',
            'pagamento'
        ]
        read_only_fields = fields
    
    def get_paciente_detail(self, obj):
        return {
            'id': obj.paciente.id,
            'nome': obj.paciente.nome,
            'telefone': obj.paciente.telefone,
            'email': obj.paciente.email,
        }
    
    def get_procedimento_detail(self, obj):
        if not obj.procedimento:
            return None
        return {
            'id': obj.procedimento.id,
            'nome': obj.procedimento.nome,
            'duracao_minutos': obj.procedimento.duracao_minutos,
            'preco_base': str(obj.procedimento.preco_base),
        }
    
    def get_criado_por_detail(self, obj):
        if not obj.criado_por:
            return None
        return {
            'id': obj.criado_por.id,
            'username': obj.criado_por.username,
            'nome_completo': obj.criado_por.get_full_name(),
        }
    
    def get_updated_by_detail(self, obj):
        if not obj.updated_by:
            return None
        return {
            'nome_completo': obj.updated_by.get_full_name(),
        }
    
    def get_pagamento(self, obj):
        pagamentos = obj.pagamentos.all()
        return [{
            'id': p.id,
            'status': p.status,
            'pago_em': p.pago_em,
        } for p in pagamentos]
