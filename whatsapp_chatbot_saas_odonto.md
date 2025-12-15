# 📱 Chatbot WhatsApp – SaaS Odontológico

Este documento descreve a **arquitetura, modelagem e fluxo técnico** para implementar um chatbot de WhatsApp integrado ao SaaS odontológico.

Stack utilizada:
- **Backend:** Django + Django REST Framework
- **Processamento assíncrono:** Celery
- **Frontend:** Next.js + React Query + Zod + Axios
- **Mensageria:** WhatsApp Cloud API (Meta) ou Twilio

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
    dentist = models.ForeignKey(Dentist, on_delete=models.CASCADE)
    patient_phone = models.CharField(max_length=20)

    last_message_at = models.DateTimeField(auto_now=True)
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
        choices=[("patient", "Patient"), ("bot", "Bot")]
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

## 📦 Provedores de WhatsApp

Recomendados:
1. **WhatsApp Cloud API (Meta)** – oficial, escalável
2. **Twilio** – fácil integração, custo maior
3. **360Dialog** – intermediário

❌ Não utilizar APIs não oficiais (WhatsApp Web)

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
