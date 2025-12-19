# 📱 Chatbot WhatsApp – SaaS Odontológico

Este documento descreve a **arquitetura, modelagem e fluxo técnico** para implementar um chatbot de WhatsApp integrado ao SaaS odontológico.

Stack utilizada:
- **Backend:** Django + Django REST Framework
- **Processamento assíncrono:** Celery
- **Frontend:** Next.js + React Query + Zod + Axios
- **Mensageria:** WhatsApp Cloud API (Meta) ou EvolutionAPI

---

## 🎯 Objetivo

Permitir que o **dentista informe um número de WhatsApp** no sistema e que esse número se torne um **chatbot automático**, capaz de:
- Marcar consultas
- Cancelar consultas
- Reagendar consultas
- Responder dúvidas básicas

---

## 🧠 Conceito Principal

O chatbot **não é apenas um bot genérico**, mas sim um **serviço vinculado ao dentista**, com:
- Configuração própria
- Status (ativo/inativo)
- Histórico de conversas
- Possibilidade futura de IA

---

## 🗂️ Modelagem de Dados

### 1️⃣ Dentista

```python
class Dentist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    clinic_name = models.CharField(max_length=255)
```

---

### 2️⃣ Integração WhatsApp

Representa a conexão do dentista com o WhatsApp.

```python
class WhatsAppIntegration(models.Model):
    dentist = models.OneToOneField(
        Dentist,
        on_delete=models.CASCADE,
        related_name="whatsapp"
    )

    phone_number = models.CharField(max_length=20)

    provider = models.CharField(
        max_length=50,
        choices=[
            ("meta", "WhatsApp Cloud API"),
            ("twilio", "Twilio"),
            ("360dialog", "360Dialog"),
        ]
    )

    is_active = models.BooleanField(default=False)

    webhook_token = models.CharField(max_length=255)
    access_token = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
```

📌 **Responsabilidade:**
- Armazenar tokens
- Controlar status
- Definir provedor

---

### 3️⃣ Configuração do Chatbot

Define o comportamento do bot.

```python
class ChatbotConfig(models.Model):
    whatsapp = models.OneToOneField(
        WhatsAppIntegration,
        on_delete=models.CASCADE,
        related_name="chatbot"
    )

    welcome_message = models.TextField(
        default="Olá! Sou o assistente da clínica 😊"
    )

    allow_schedule = models.BooleanField(default=True)
    allow_cancel = models.BooleanField(default=True)

    use_ai = models.BooleanField(default=False)
    ai_model = models.CharField(max_length=50, default="gpt-4.1-mini")
```

---

### 4️⃣ Conversas e Mensagens

Histórico completo de atendimento.

```python
class WhatsAppConversation(models.Model):
    dentista = models.ForeignKey(Dentist, on_delete=models.CASCADE)
    paciente_telefone = models.CharField(max_length=20)

    data_ultima_mensagem = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
```

```python
class WhatsAppMessage(models.Model):
    conversation = models.ForeignKey(
        WhatsAppConversation,
        on_delete=models.CASCADE,
        related_name="messages"
    )

    sender = models.CharField(
        max_length=10,
        choices=[("paciente", "Paciente"), ("bot", "Bot")]
    )

    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
```

---

## 🔁 Fluxo Técnico

### 1️⃣ Dentista ativa o WhatsApp (Frontend)

```http
POST /api/whatsapp/connect
```

```json
{
  "phone_number": "+5511999999999"
}
```

Resposta:
```json
{
  "status": "pending",
  "qr_code": "base64..."
}
```

---

### 2️⃣ Recebimento de Mensagens (Webhook)

```http
POST /webhooks/whatsapp/
```

```python
@api_view(["POST"])
def whatsapp_webhook(request):
    process_message.delay(request.data)
    return Response(status=200)
```

---

### 3️⃣ Processamento Assíncrono (Celery)

```python
@shared_task
def process_message(payload):
    # 1. Identifica o dentista pelo número
    # 2. Salva a mensagem
    # 3. Detecta intenção
    # 4. Gera resposta
    # 5. Envia mensagem via API do WhatsApp
```

---

## 🧩 Lógica Inicial do Chatbot (Sem IA)

Menu simples e confiável:

```
1️⃣ Marcar consulta
2️⃣ Cancelar consulta
3️⃣ Falar com atendente
```

Exemplo de regra:

```python
if "marcar" in message.lower():
    # listar horários
elif "cancelar" in message.lower():
    # solicitar identificação
```

---

## 🤖 Evolução com IA (Opcional)

Após validação do MVP:
- NLP para detectar intenção
- Integração com GPT
- Respostas mais naturais
- Treinamento com histórico

---

Recomendado: **WAHA (WhatsApp HTTP API)**
- **Doc:** https://waha.devlike.pro/
- **Por que?** Estável, leve, Docker-first, excelente documentação Swagger.

### � Exemplos de Endpoints WAHA (Consumo via Django)

O Django atuará como o cliente da API WAHA.

#### 1. Iniciar Sessão (Conectar Dentista)
`POST /api/sessions/`

```python
import requests

def start_whatsapp_session(dentist_id):
    url = "http://waha:3000/api/sessions"
    payload = {
        "name": f"clinica_{dentist_id}",
        "config": {
            "webhooks": [
                {
                    "url": "https://seu-saas.com/api/webhooks/whatsapp/",
                    "events": ["message", "session.status"]
                }
            ]
        }
    }
    response = requests.post(url, json=payload)
    return response.json() # Retorna infos para montar o QR Code
```

#### 2. Pegar QR Code (Imagem)
`GET /api/sessions/{session_name}/auth/qr?format=image`

Use isso para exibir no Frontend pro dentista escanear.

#### 3. Enviar Mensagem de Texto
`POST /api/send/text`

```python
def send_whatsapp_message(session_name, phone, text):
    url = "http://waha:3000/api/send/text"
    payload = {
        "session": session_name,
        "chatId": f"{phone}@c.us",
        "text": text
    }
    requests.post(url, json=payload)
```

#### 4. Simular "Digitando..."
`POST /api/sessions/{session_name}/typing`

---

## 🧠 Cérebro do Chatbot: Qual IA usar?

Para um SaaS de Odontologia (focado em agendamento preciso), a **precisão** é mais importante que a criatividade.

### Opção A: n8n (Low-Code) ⚠️
- **Como funciona:** Webhook do WAHA -> n8n -> OpenAI -> API Django.
- **Prós:** Visual, fácil de montar fluxos simples.
- **Contras (SaaS):** Difícil escalar. Você teria que ter um "workflow mestre" gigante ou um por cliente. Gerenciar autenticação e estado da conversa no n8n para milhares de dentistas é complexo.
- **Veredito:** Bom para MVP rápido, ruim para SaaS robusto em escala.

### Opção B: Typebot (Fluxo Estruturado) ⭐
- **Como funciona:** O usuário entra num fluxo pré-definido (árvore de decisão) que pode ter blocos de IA.
- **Prós:** UX excelente, coleta dados estruturados (Nome, Data) muito bem.
- **Contras:** Integração direta com o banco do Django para verificar disponibilidade de horário requer expor endpoints públicos da sua API.

### Opção C: Django + OpenAI (Function Calling) 🏆 **RECOMENDADO**
- **Como funciona:** O Django recebe a mensagem, consulta o histórico e manda pra OpenAI com "ferramentas" disponíveis (ex: `check_schedule`, `book_appointment`).
- **Prós:**
  - **Acesso Direto ao Banco:** O Django já tem os models de Agenda. Não precisa criar API intermediária.
  - **Controle:** Você define exatamente as regras de negócio no Python.
  - **Custo:** Paga apenas tokens da OpenAI, sem pagar licença de n8n/Typebot cloud.
- **Setup:**
  - Lib `langchain` ou `openai` direta.
  - Celery para fila de processamento.

---
---

## 🔐 Considerações Importantes

- LGPD (dados sensíveis)
- Logs e auditoria
- Controle de permissões
- Billing por número ativo

---

## ✅ Conclusão

- O chatbot deve ser tratado como **serviço do dentista**
- Separação clara de responsabilidades
- Celery é essencial
- Começar simples → evoluir com IA

---

📌 **Próximos passos sugeridos**:
- Diagrama da arquitetura
- Sistema de intents
- Painel de conversas
- Controle de cobrança
