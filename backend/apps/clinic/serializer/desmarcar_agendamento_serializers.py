from rest_framework import serializers
from ..models import Agendamento, Atendimentos
from ..choices import StatusAgendamento


class DesmarcarAgendamentoSerializer(serializers.Serializer):
    """
    Serializer para desmarcar um ou múltiplos agendamentos.
    Aceita tanto um único ID quanto uma lista de IDs de agendamentos.
    """
    agendamento_id = serializers.IntegerField(required=False, allow_null=True)
    agendamento_ids = serializers.ListField(
        child=serializers.IntegerField(),
        required=False,
        allow_empty=False
    )
    
    def validate(self, data):
        """
        Valida que pelo menos um dos campos foi fornecido.
        """
        agendamento_id = data.get('agendamento_id')
        agendamento_ids = data.get('agendamento_ids')
        
        # Verifica se pelo menos um campo foi fornecido
        if not agendamento_id and not agendamento_ids:
            raise serializers.ValidationError(
                "Você deve fornecer 'agendamento_id' ou 'agendamento_ids'."
            )
        
        # Se ambos foram fornecidos, usar apenas agendamento_ids
        if agendamento_id and agendamento_ids:
            raise serializers.ValidationError(
                "Forneça apenas 'agendamento_id' OU 'agendamento_ids', não ambos."
            )
        
        # Normaliza para sempre trabalhar com uma lista
        if agendamento_id:
            ids_list = [agendamento_id]
        else:
            ids_list = agendamento_ids
        
        # Valida se os agendamentos existem
        agendamentos = Agendamento.objects.filter(id__in=ids_list)
        agendamentos_encontrados = {ag.id for ag in agendamentos}
        ids_solicitados = set(ids_list)
        
        # Verifica se todos os IDs foram encontrados
        ids_nao_encontrados = ids_solicitados - agendamentos_encontrados
        if ids_nao_encontrados:
            raise serializers.ValidationError(
                f"Agendamentos não encontrados: {sorted(ids_nao_encontrados)}"
            )
        
        # Armazena os agendamentos para uso posterior
        self.agendamentos = list(agendamentos)
        
        return data
    
    def save(self, usuario, dentista):
        """
        Processa a desmarcação dos agendamentos:
        1. Verifica se o agendamento está pago e confirmado.
        2. Se estiver, reagenda para o próximo dia (reaproveitamento).
        3. Caso contrário, desmarca:
           - Define active = False
           - Define status como cancelada
           - Cria ou atualiza o atendimento com status cancelado no histórico
        
        Retorna um dicionário com resultados e erros.
        """
        from datetime import timedelta
        from apps.billing.choices import StatusPagamento
        from django.db import transaction
        
        usuario_nome = usuario.get_full_name() or usuario.username
        resultados = []
        erros = []
        
        for agendamento in self.agendamentos:
            try:
                with transaction.atomic():
                    # 1. Validações básicas
                    if agendamento.dentista != dentista:
                        erros.append({
                            'agendamento_id': agendamento.id,
                            'erro': 'Você não tem permissão para desmarcar este agendamento'
                        })
                        continue
                    
                    if agendamento.status == StatusAgendamento.CANCELADA:
                        erros.append({
                            'agendamento_id': agendamento.id,
                            'erro': 'Este agendamento já está cancelado'
                        })
                        continue

                    # 2. Lógica de REAPROVEITAMENTO (Pago + Confirmado)
                    # Verifica se existe pelo menos um pagamento com status 'pago'
                    # NOTA: O prefetch_related forçado aqui não é necessário pois o query_set original tem
                    esta_pago = agendamento.pagamentos.filter(status=StatusPagamento.PAGO).exists()
                    esta_confirmado = agendamento.status == StatusAgendamento.CONFIRMADA

                    if esta_pago and esta_confirmado:
                        # Se está pago e confirmado, reagendamos para o próximo dia no mesmo horário
                        data_original = agendamento.data_hora
                        nova_data_hora = agendamento.data_hora + timedelta(days=1)
                        
                        agendamento.data_hora = nova_data_hora
                        agendamento.motivo = f"Reagendamento automático (Dia {data_original.strftime('%d/%m')} cancelado) por {usuario_nome}"
                        agendamento.active = True
                        agendamento.updated_by = usuario
                        agendamento.save()

                        # --- FUTURO: INTEGRAÇÃO WHATSAPP ---
                        # O comentário abaixo serve para marcar onde a lógica do WAHA entrará
                        # whatsapp_service.enviar_aviso_reagendamento(agendamento)
                        
                        resultados.append({
                            'agendamento_id': agendamento.id,
                            'status': agendamento.status,
                            'reagendado': True,
                            'nova_data': agendamento.data_hora.isoformat(),
                            'mensagem': f"Paciente {agendamento.paciente.nome} reagendado para amanha por estar pago/confirmado."
                        })
                        continue
                    
                    # 3. Fluxo de cancelamento (Não pago/confirmado ou optado por desmarcar)
                    # 3.1. Atualiza o agendamento
                    agendamento.active = False
                    agendamento.status = StatusAgendamento.CANCELADA
                    agendamento.motivo = f"Desmarcado por {usuario_nome}"
                    agendamento.updated_by = usuario
                    agendamento.save()
                    
                    # 3.2. Move para o histórico (Atendimentos)
                    # Se houver observações no agendamento, levamos para o tratamento_realizado
                    obs = agendamento.observacoes if agendamento.observacoes else "Sem observações adicionais."
                    
                    atendimento, created = Atendimentos.objects.update_or_create(
                        agendamento=agendamento,
                        defaults={
                            'status': StatusAgendamento.CANCELADA,
                            'diagnostico': f"Cancelamento registrado por {usuario_nome}.",
                            'tratamento_realizado': f"AGENDAMENTO CANCELADO. Obs original: {obs}",
                        }
                    )
                    
                    resultados.append({
                        'agendamento_id': agendamento.id,
                        'status': agendamento.status,
                        'active': agendamento.active,
                        'reagendado': False,
                        'motivo': agendamento.motivo,
                        'atendimento_id': atendimento.id,
                        'atendimento_criado': created
                    })
                
            except Exception as e:
                erros.append({
                    'agendamento_id': agendamento.id,
                    'erro': str(e)
                })
        
        return {
            'resultados': resultados,
            'erros': erros,
            'total_processados': len(resultados),
            'total_erros': len(erros),
            'total_solicitados': len(self.agendamentos)
        }
