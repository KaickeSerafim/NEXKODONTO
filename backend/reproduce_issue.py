
import os
import django
from datetime import datetime, time
import pytz

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.utils import timezone
from django.conf import settings

def test_timezone_issue():
    print(f"Timezone: {settings.TIME_ZONE}")
    print(f"Use TZ: {settings.USE_TZ}")

    # Simulate an appointment at 08:00 BRT
    # 08:00 BRT is 11:00 UTC
    brt = pytz.timezone('America/Sao_Paulo')
    
    # Create a naive date (as if input)
    naive_dt = datetime(2026, 1, 13, 8, 0, 0) # 8 AM
    aware_dt_brt = brt.localize(naive_dt) # 8 AM BRT
    aware_dt_utc = aware_dt_brt.astimezone(pytz.UTC) # 11 AM UTC
    
    print(f"Appointment Time (BRT): {aware_dt_brt}")
    print(f"Appointment Time (UTC - stored in DB): {aware_dt_utc}")
    
    # Simulate DisponibilidadeView logic
    # The view iterates slots using local time (08:00, 08:30...)
    slot_time = time(8, 0)
    print(f"Checking slot: {slot_time}")
    
    # The problematic comparison:
    # ag.data_hora is aware_dt_utc (simulating fetched from DB)
    ag_data_hora = aware_dt_utc
    
    print(f"ag.data_hora (UTC): {ag_data_hora}")
    print(f"ag.data_hora.time() (Raw): {ag_data_hora.time()}")
    
    # Expected logic failure
    if ag_data_hora.time() == slot_time:
         print("MATCH! (Unexpected if logic is correct)")
    else:
         print("NO MATCH! (Expected failure)")
         
    # Corrected logic
    ag_data_hora_local = timezone.localtime(ag_data_hora)
    print(f"ag.data_hora (Local): {ag_data_hora_local}")
    print(f"ag.data_hora_local.time(): {ag_data_hora_local.time()}")
    
    if ag_data_hora_local.time() == slot_time:
        print("MATCH! (Correct logic)")
    else:
        print("NO MATCH! (Still failing?)")

if __name__ == '__main__':
    test_timezone_issue()
