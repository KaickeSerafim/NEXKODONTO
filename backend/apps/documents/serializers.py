from rest_framework import serializers
from .models import PacienteDocumento
from apps.clinic.serializers import PacienteSerializer

class EnviadoPorSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    nome_completo = serializers.SerializerMethodField()
    
    def get_nome_completo(self, obj):
        return obj.get_full_name()

class PacienteDocumentoSerializer(serializers.ModelSerializer):
    paciente_detail = PacienteSerializer(source='paciente', read_only=True)
    enviado_por_detail = EnviadoPorSerializer(source='enviado_por', read_only=True)
    
    class Meta:
        model = PacienteDocumento
        fields = ['id', 'paciente', 'paciente_detail', 'agendamento', 'enviado_por_detail', 
                  'arquivo', 'tipo', 'descricao', 'criado_em']
        read_only_fields = ['id', 'criado_em', 'enviado_por']
