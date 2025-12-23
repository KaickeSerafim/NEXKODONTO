from rest_framework import serializers
from ..models import HistoricoMedico

class HistoricoMedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricoMedico
        fields = ['id', 'paciente', 'alergias', 'condicoes_medicas', 'medicamentos', 
                  'criado_em', 'atualizado_em']
        read_only_fields = ['id', 'paciente', 'criado_em', 'atualizado_em']
