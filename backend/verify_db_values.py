
import os
import django
from django.conf import settings

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.clinic.models import Agendamento
from django.utils import timezone

def inspect_db():
    print(f"Timezone do Projeto (settings.TIME_ZONE): {settings.TIME_ZONE}")
    print(f"Usa Timezone (settings.USE_TZ): {settings.USE_TZ}")
    print("-" * 50)

    last_agendamentos = Agendamento.objects.all().order_by('-id')[:5]

    if not last_agendamentos:
        print("Nenhum agendamento encontrado no banco de dados.")
        return

    for ag in last_agendamentos:
        print(f"ID: {ag.id}")
        print(f"Paciente: {ag.paciente}")
        # Raw value from DB (usually UTC if USE_TZ=True)
        print(f"Data/Hora (Armazenado no Banco): {ag.data_hora}")
        print(f" .time() do Armazenado (O que o código usa hoje): {ag.data_hora.time()}")
        
        # Converted to Local
        local_dt = timezone.localtime(ag.data_hora)
        print(f"Data/Hora (Convertido para Local): {local_dt}")
        print(f" .time() do Local (O que deveria usar): {local_dt.time()}")
        print("-" * 50)

if __name__ == '__main__':
    inspect_db()
