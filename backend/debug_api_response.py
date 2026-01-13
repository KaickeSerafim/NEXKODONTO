
import os
import django
import json
from datetime import datetime, timedelta
from django.utils import timezone

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from rest_framework.test import APIClient
from apps.clinic.models import Agendamento, Paciente
from apps.usuarios.models import CustomUser
from apps.clinic.choices import StatusAgendamento

def debug_response():
    print("--- Simulating API Request ---")
    
    # 1. Setup
    client = APIClient()
    dentista = CustomUser.objects.filter(role='dentista').first()
    client.force_authenticate(user=dentista)
    
    paciente = Paciente.objects.first()
    if not paciente:
        paciente = Paciente.objects.create(nome="Paciente Debug", criado_por=dentista)

    today = (timezone.now() + timedelta(days=1)).date()
    
    # 2. Create Conflict
    # Existing: 09:00 - 09:40
    dt_start = datetime.combine(today, datetime.min.time().replace(hour=9, minute=0))
    dt_start = timezone.make_aware(dt_start)
    
    Agendamento.objects.filter(dentista=dentista, data_hora__date=today).delete()
    
    Agendamento.objects.create(
        dentista=dentista,
        paciente=paciente,
        data_hora=dt_start,
        duracao_estimada=40,
        status=StatusAgendamento.AGENDADA,
        active=True
    )
    
    # 3. Request Overlap
    # Attempt: 09:10 (Overlaps)
    dt_attempt = datetime.combine(today, datetime.min.time().replace(hour=9, minute=10))
    dt_attempt = timezone.make_aware(dt_attempt)
    
    payload = {
        "paciente_id": paciente.id,
        "data_hora": dt_attempt.isoformat(),
        "duracao_estimada": 30,
        "valor": 100,
        # Status missing (should default to AGENDADA and trigger validation)
    }
    
    print("Sending POST request...")
    response = client.post('/api/v1/agendamentos/', payload, format='json')
    
    print(f"\nStatus Code: {response.status_code}")
    
    try:
        data = response.json()
        print("\nJSON Response Body:")
        print(json.dumps(data, indent=2, ensure_ascii=False))
    except Exception as e:
        print(f"Raw Content: {response.content}")
        print(f"Error parsing JSON: {e}")

if __name__ == '__main__':
    debug_response()
