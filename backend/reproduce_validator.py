
import os
import django
from datetime import datetime, timedelta
from django.utils import timezone
from django.core.exceptions import ValidationError

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.clinic.models import Agendamento
from apps.clinic.utils.validators import validate_appointment_overlap
from apps.usuarios.models import CustomUser
from apps.clinic.choices import StatusAgendamento

def test_validator():
    print("--- Testing Validator ---")
    
    # 1. Setup Data
    # Get or create a dentist
    dentista = CustomUser.objects.filter(role='dentista').first()
    
    from apps.clinic.models import Paciente
    paciente = Paciente.objects.first()
    if not paciente:
        # Create dummy patient if needed
        paciente = Paciente.objects.create(
            nome="Paciente Teste",
            criado_por=dentista
        )


    # User scenario:
    # Appointment 1: 09:00 - 09:40 (40 mins)
    # Appointment 2: 10:10 - 10:40 (30 mins)
    # Gap: 09:40 - 10:10 (30 mins)
    # Attempt: 09:40 - 10:20 (40 mins) -> Should Fail

    today = timezone.now().date()
    
    # Helper to create aware datetime
    def make_dt(hour, minute):
        dt_naive = datetime.combine(today, datetime.min.time().replace(hour=hour, minute=minute))
        return timezone.make_aware(dt_naive)

    dt1_start = make_dt(9, 0)
    dt1_end = dt1_start + timedelta(minutes=40)
    
    dt2_start = make_dt(10, 10)
    dt2_end = dt2_start + timedelta(minutes=30)
    
    print(f"Scenario:")
    print(f"Existing 1: {dt1_start} - {dt1_end}")
    print(f"Existing 2: {dt2_start} - {dt2_end}")
    
    # Create conflicting appointment in DB (temporarily)
    # Ensure no other conflicts exist for today
    Agendamento.objects.filter(dentista=dentista, data_hora__date=today).delete()
    
    ag1 = Agendamento.objects.create(
        dentista=dentista,
        paciente=paciente,
        data_hora=dt1_start,
        duracao_estimada=40,
        status=StatusAgendamento.AGENDADA,
        active=True
    )
    
    ag2 = Agendamento.objects.create(
        dentista=dentista,
        paciente=paciente,
        data_hora=dt2_start,
        duracao_estimada=30,
        status=StatusAgendamento.AGENDADA,
        active=True
    )
    
    # Attempt to insert overlap
    attempt_start = make_dt(9, 40)
    attempt_duration = 40 # Ends at 10:20, overlaps with ag2 (starts 10:10)
    
    print(f"\nAttempting validation for: {attempt_start} with duration {attempt_duration} (Ends {attempt_start + timedelta(minutes=attempt_duration)})")
    
    try:
        validate_appointment_overlap(
            dentista=dentista,
            data_hora=attempt_start,
            duracao_estimada=attempt_duration
        )
        print("❌ Validation PASSED (Unexpected - Should have failed)")
    except ValidationError as e:
        print(f"✅ Validation FAILED (Expected): {e}")

    # Cleanup
    ag1.delete()
    ag2.delete()

if __name__ == '__main__':
    test_validator()
