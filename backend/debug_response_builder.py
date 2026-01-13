
import os
import django
import json
from rest_framework import serializers

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.utils.response_builder import ResponseBuilder

def debug_response_builder():
    print("--- Simulating ResponseBuilder JSON Structure ---")
    
    # Simulate Serializer Errors
    # This is exactly what the View passes: serializer.errors
    errors = {
        "non_field_errors": [
            "Conflito de horário: O intervalo disponível é de apenas 30 minutos (até às 10:10)."
        ],
        "data_hora": [
            "A data e hora do agendamento não podem estar no passado."
        ]
    }
    
    # View logic:
    # return ResponseBuilder().error("Erro ao criar agendamento").with_errors(serializer.errors).to_response()
    
    response = ResponseBuilder().error("Erro ao criar agendamento").with_errors(errors).to_response()
    
    print("\nSimulated View Response:")
    print(f"Status Code: {response.status_code}")
    print("JSON Body:")
    print(json.dumps(response.data, indent=2, ensure_ascii=False))

if __name__ == '__main__':
    debug_response_builder()
