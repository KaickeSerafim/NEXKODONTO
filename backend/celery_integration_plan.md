# Plano de Integração com Celery para Agendamentos

Este plano descreve como automatizar o fechamento de agendamentos passados e a criação de registros de atendimento utilizando Celery e Celery Beat.

## User Review Required

> [!IMPORTANT]
> Celery e Redis não estão instalados no projeto. O plano inclui a instalação dessas dependências.
> É necessário ter um servidor Redis (ou similar) rodando para o Celery funcionar.

## Mudanças Propostas

### 0. Instalação de Dependências
Adicionar `celery` e `redis` ao `requirements.txt`.

---

### 1. Configuração do Celery no Django

#### [NEW] [celery.py](file:///c:/Users/kaicke/Desktop/NEXKODONTO/backend/core/celery.py)
Criar o arquivo de inicialização do Celery para o projeto.

#### [MODIFY] [__init__.py](file:///c:/Users/kaicke/Desktop/NEXKODONTO/backend/core/__init__.py)
Garantir que o Celery seja carregado quando o Django iniciar.

#### [MODIFY] [settings.py](file:///c:/Users/kaicke/Desktop/NEXKODONTO/backend/core/settings.py)
Adicionar configurações do Celery (Broker URL, Result Backend, etc.) e agendamento do Celery Beat.

---

### 2. Implementação das Tasks

#### [NEW] [tasks.py](file:///c:/Users/kaicke/Desktop/NEXKODONTO/backend/apps/clinic/tasks.py)
Implementar as tarefas assíncronas.

```python
from celery import shared_task
from django.utils import timezone
from .models import Agendamento, Atendimentos

@shared_task
def processar_agendamento_especifico(agendamento_id):
    """Processa um único agendamento disparado por um signal."""
    try:
        agendamento = Agendamento.objects.get(pk=agendamento_id, active=True)
        if agendamento.data_hora < timezone.now():
            executar_finalizacao(agendamento)
    except Agendamento.DoesNotExist:
        pass

@shared_task
def verificar_e_finalizar_agendamentos_passados():
    """Tarefa periódica para 'limpar' agendamentos que passaram do tempo."""
    agendamentos = Agendamento.objects.filter(
        active=True,
        data_hora__lt=timezone.now()
    )
    for agendamento in agendamentos:
        executar_finalizacao(agendamento)

def ejecutar_finalizacao(agendamento):
    """Lógica centralizada de finalização."""
    Agendamento.objects.filter(pk=agendamento.pk).update(active=False)
    if not hasattr(agendamento, 'atendimento'):
        Atendimentos.objects.create(
            agendamento=agendamento,
            diagnostico="Consulta finalizada automaticamente via sistema",
            tratamento_realizado=agendamento.observacoes if agendamento.observacoes else "Realizado conforme agendamento"
        )
```

---

### 3. Integração com Signal

#### [MODIFY] [signals.py](file:///c:/Users/kaicke/Desktop/NEXKODONTO/backend/apps/clinic/signals.py)
Modificar o signal para disparar a task do Celery em vez de processar síncronamente.

```python
from .tasks import processar_agendamento_especifico

@receiver(post_save, sender=Agendamento)
def disparar_processamento_agendamento(sender, instance, created, **kwargs):
    if instance.active and instance.data_hora < timezone.now():
        # Dispara a task de forma assíncrona
        processar_agendamento_especifico.delay(instance.pk)
```

---

### 4. Agendamento Periódico (Celery Beat)
Configurar no `settings.py` para que a task rode a cada hora (ou intervalo desejado).

---

## Plano de Verificação

### Testes Manuais
1. Criar um agendamento com data futura.
2. Alterar a data no banco para o passado.
3. Executar a task manualmente via shell do Django: `verificar_e_finalizar_agendamentos_passados.delay()`.
4. Verificar se o agendamento foi desativado e o atendimento criado.
5. Iniciar o Celery Beat e verificar se a task é disparada conforme o intervalo configurado.
