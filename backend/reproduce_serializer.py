
import os
import django
from datetime import datetime, timedelta
from django.utils import timezone
from rest_framework.exceptions import ValidationError

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.clinic.models import Agendamento, Paciente
from apps.clinic.serializer.agendamento_serializers import AgendamentoSerializer
from apps.usuarios.models import CustomUser
from apps.clinic.choices import StatusAgendamento

def test_serializer():
    print("--- Testing Serializer ---")
    
    # 1. Setup Data
    dentista = CustomUser.objects.filter(role='dentista').first()
    paciente = Paciente.objects.first()
    if not paciente:
        paciente = Paciente.objects.create(nome="Paciente Teste", criado_por=dentista)

    today = (timezone.now() + timedelta(days=1)).date()
    def make_dt(hour, minute):
        dt_naive = datetime.combine(today, datetime.min.time().replace(hour=hour, minute=minute))
        return timezone.make_aware(dt_naive)

    # 2. Create Conflict
    dt1_start = make_dt(9, 0)
    
    # Ensure clean slate
    Agendamento.objects.filter(dentista=dentista, data_hora__date=today).delete()
    
    Agendamento.objects.create(
        dentista=dentista,
        paciente=paciente,
        data_hora=dt1_start,
        duracao_estimada=40,
        status=StatusAgendamento.AGENDADA,
        active=True
    )
    
    # 3. Serializer Input (Overlapping)
    # 09:10 overlaps with 09:00-09:40
    data = {
        "paciente_id": paciente.id,
        "data_hora": make_dt(9, 10).strftime("%Y-%m-%dT%H:%M:%S"),
        "duracao_estimada": 30,
        "valor": 100,
        # NO STATUS PROVIDED
    }
    
    print(f"Attempting to create overlapping appointment via Serializer (Status missing in payload)...")
    
    # Needs request context for dentista? 
    # Serializer code: "if not dentista and 'request' in self.context: dentista = self.context['request'].user"
    # But here we don't have request.
    # However, validate() fetches dentista from data if present.
    # The frontend usually doesn't send dentista in body?
    # Backend gets it from request.user.
    
    # Let's mock request context
    class MockUser:
        def __init__(self, user):
            self.user = user
    class MockRequest:
        def __init__(self, user):
            self.user = user
            
    # Or simpler: Is dentista required in data?
    # The view usually injects it or serializer gets from context.
    # We can pass context.
    
    context = {'request': MockRequest(dentista)}
    
    serializer = AgendamentoSerializer(data=data, context=context)
    
    if serializer.is_valid():
        print("❌ Serializer is VALID (Unexpected - Should have failed due to overlap)")
        print("Validated Data:", serializer.validated_data)
        # Check if status was defaulted in validated_data?
        # If 'status' is not in validated_data, how will save() work? Model default.
        # But validate() runs BEFORE save(), so it sees nothing.
    else:
        print(f"✅ Serializer INVALID (Expected): {serializer.errors}")

if __name__ == '__main__':
    test_serializer()
