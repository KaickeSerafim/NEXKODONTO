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
        1. Define active = False
        2. Define motivo com o usuário que desmarcou
        3. Define status como cancelada
        4. Cria ou atualiza o atendimento com status cancelado
        
        Retorna um dicionário com resultados e erros.
        """
        usuario_nome = usuario.get_full_name() or usuario.username
        resultados = []
        erros = []
        
        for agendamento in self.agendamentos:
            try:
                # Verifica se o agendamento pertence ao dentista
                if agendamento.dentista != dentista:
                    erros.append({
                        'agendamento_id': agendamento.id,
                        'erro': 'Você não tem permissão para desmarcar este agendamento'
                    })
                    continue
                
                # Verifica se já está cancelado
                if agendamento.status == StatusAgendamento.CANCELADA:
                    erros.append({
                        'agendamento_id': agendamento.id,
                        'erro': 'Este agendamento já está cancelado'
                    })
                    continue
                
                # 1. Desativa o agendamento
                agendamento.active = False
                
                # 2. Define o motivo com o nome do usuário
                agendamento.motivo = f"Agendamento desmarcado por {usuario_nome}"
                
                # 3. Define o status como cancelada
                agendamento.status = StatusAgendamento.CANCELADA
                
                # 4. Define quem atualizou
                agendamento.updated_by = usuario
                
                # Salva o agendamento
                agendamento.save()
                
                # 5. Cria ou atualiza o atendimento
                atendimento, created = Atendimentos.objects.get_or_create(
                    agendamento=agendamento,
                    defaults={
                        'status': StatusAgendamento.CANCELADA,
                        'diagnostico': f"Atendimento desmarcado por {usuario_nome}",
                        'tratamento_realizado': f"Agendamento cancelado - Não houve atendimento"
                    }
                )
                
                # Se o atendimento já existia, atualiza os dados
                if not created:
                    atendimento.status = StatusAgendamento.CANCELADA
                    atendimento.diagnostico = f"Atendimento desmarcado por {usuario_nome}"
                    atendimento.tratamento_realizado = f"Agendamento cancelado - Não houve atendimento"
                    atendimento.save()
                
                resultados.append({
                    'agendamento_id': agendamento.id,
                    'status': agendamento.status,
                    'active': agendamento.active,
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
