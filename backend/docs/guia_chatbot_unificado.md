# 🤖 Guia Definitivo: Chatbot WhatsApp SaaS (Django + WAHA)

Este documento unifica a arquitetura do **SaaS Odontológico** com a implementação técnica da ferramenta **WAHA**, detalhando da conexão do dentista até o pagamento via PIX pelo paciente.

---

## 🏗️ 1. Arquitetura Geral

Estamos utilizando uma abordagem **"Brain-Body"**:
- **Cérebro (Django + Celery):** Onde reside a lógica de negócio, agendamento, banco de dados e inteligência (OpenAI/Groq).
- **Corpo (WAHA):** Serviço Docker isolado responsável apenas por enviar/receber mensagens do WhatsApp via Socket.

### 🔗 Fluxo de Conexão (Onboarding)
1.  **Frontend (Next.js):** Dentista acessa `/configuracoes/whatsapp` e clica em "Conectar".
2.  **API (Django):** Cria uma sessão na WAHA e recupera o QR Code em Base64.
3.  **Frontend:** Exibe o Code. Dentista escaneia.
4.  **Webhook:** WAHA avisa Django (`session.status: connected`).
5.  **Banco:** Atualiza status do dentista para `ATIVO`.

---

## 🗂️ 2. Modelagem de Dados (Django)

Estrutura robusta para suportar múltiplos dentistas (SaaS).

```python
# apps/whatsapp/models.py

class WhatsAppSession(models.Model):
    """Sessão técnica do WAHA"""
    dentista = models.OneToOneField('clinic.Dentist', related_name='whatsapp_session', on_delete=models.CASCADE)
    session_id = models.CharField(max_length=255, unique=True) # Nome da sessão no WAHA (ex: 'clinica_85')
    status = models.CharField(max_length=50, default='DISCONNECTED')
    updated_at = models.DateTimeField(auto_now=True)

class ChatbotConfig(models.Model):
    """Configurações personalizadas do Dentista"""
    dentista = models.OneToOneField('clinic.Dentist', related_name='bot_config', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)
    welcome_message = models.TextField(default="Olá! Sou o assistente virtual. Como posso ajudar?")
    ai_model = models.CharField(max_length=50, default="llama-3.1-70b")
    pix_key = models.CharField(max_length=255, blank=True, null=True) # Para receber pagamentos

class WhatsAppConversation(models.Model):
    """Histórico de conversas"""
    session = models.ForeignKey(WhatsAppSession, on_delete=models.CASCADE)
    patient_phone = models.CharField(max_length=30) # ID do chat (ex: 551199999999@c.us)
    last_interaction = models.DateTimeField(auto_now=True)
    # Contexto para IA saber o que estava falando
    conversation_context = models.JSONField(default=dict) 
```

---

## 🔌 3. Serviço WAHA (Integração)

Classe utilitária para o Django falar com o container WAHA.

```python
# apps/whatsapp/services/waha.py
import requests

class WahaService:
    def __init__(self, base_url="http://waha:3000"):
        self.base_url = base_url

    def get_qr_code(self, session_id):
        """Inicia sessão e pega QR"""
        # 1. Start Session
        requests.post(f"{self.base_url}/api/sessions", json={
            "name": session_id,
            "config": {
                "webhooks": [{"url": "http://django:8000/api/v1/whatsapp/webhook/", "events": ["message", "session.status"]}]
            }
        })
        # 2. Get Image
        resp = requests.get(f"{self.base_url}/api/sessions/{session_id}/auth/qr?format=image")
        if resp.status_code == 200:
            return resp.content # Retorna binário da imagem
        return None

    def send_message(self, session_id, chat_id, text):
        requests.post(f"{self.base_url}/api/sendText", json={
            "session": session_id,
            "chatId": chat_id,
            "text": text
        })

    def send_image(self, session_id, chat_id, image_url, caption=""):
        requests.post(f"{self.base_url}/api/sendImage", json={
            "session": session_id,
            "chatId": chat_id,
            "file": {
                "url": image_url
            },
            "caption": caption
        })
```

---

## 🧠 4. O Cérebro: Processamento de Mensagens

O fluxo "mágico" que acontece quando o paciente manda mensagem.

### Fluxo de Código (Webhook -> Celery -> Lógica)

```python
# apps/whatsapp/tasks.py (Celery)

@shared_task
def process_webhook_message(payload):
    # 1. Extrair dados
    session_id = payload['session']
    chat_id = payload['payload']['from']
    text = payload['payload']['body']
    
    # 2. Recuperar Configuração do Dentista
    session = WhatsAppSession.objects.get(session_id=session_id)
    config = session.dentista.bot_config
    
    if not config.is_active:
        return # Bot desligado
        
    # 3. Roteamento de Intenção (Exemplo Simples ou IA)
    waha = WahaService()
    waha.start_typing(session_id, chat_id)
    
    # --- EXEMPLO: INTENÇÃO DE MARCAR CONSULTA ---
    if "marcar" in text.lower() or "agendar" in text.lower():
        response_text = "Claro! Tenho estes horários livres amanhã:\n- 14:00\n- 15:30\nDigite o horário para confirmar."
        # Aqui você consultaria o model Agendamento real!
        
    # --- EXEMPLO: PAGAMENTO PIX ---
    elif "pix" in text.lower() or "pagar" in text.lower():
        if config.pix_key:
            # Gerar Payload Pix (Copia e Cola) - Usando lib 'pixcode' ou API efí/asaas
            pix_code = f"00020126580014br.gov.bcb.pix0136{config.pix_key}..." 
            waha.send_message(session_id, chat_id, "Aqui está o código PIX para pagamento da consulta:")
            waha.send_message(session_id, chat_id, pix_code)
            response_text = "Após pagar, me envie o comprovante por aqui mesmo!"
        else:
            response_text = "Desculpe, este consultório não configurou chave PIX."

    # --- EXEMPLO: IA (Integração com AI_Bot) ---
    else:
        # Usa o bot de IA criado no exemplo anterior
        ai_bot = AIBot() 
        response_text = ai_bot.invoke(question=text, context=...)

    # 4. Enviar Resposta Final
    waha.stop_typing(session_id, chat_id)
    waha.send_message(session_id, chat_id, response_text)
```

---

## 🧪 5. Testando o Fluxo Completo

### Passo 1: Subir Infra
```bash
docker-compose up --build waha
# O Waha estará rodando na porta 3002
```

### Passo 2: Django - Conectar Dentista
Você chama no seu backend (ou cria um botão no frontend):
```python
# Em um shell ou view
svc = WahaService()
qr_bytes = svc.get_qr_code("clinica_teste_01")
# Salve isso num arquivo ou retorne pro frontend renderizar
```

### Passo 3: Paciente Envia "Quero agendar"
1.  **WAHA** recebe no celular virtual.
2.  **WAHA** faz POST em `http://django:8000/api/v1/whatsapp/webhook/`.
3.  **Django** recebe, joga pro Celery.
4.  **Celery** processa o texto "Quero agendar".
5.  **Celery** usa `WahaService.send_message` para devolver "Tenho horários livres...".
6.  **Paciente** recebe a resposta no WhatsApp.

---

## 💰 Extra: Integração de Pagamento (PIX)
Para um SaaS real, você não quer apenas mandar a chave PIX estática do dentista. O ideal é gerar uma **Cobrança Dinâmica** (API do Asaas, Mercado Pago, Efí).

**Exemplo de fluxo avançado:**
1.  Paciente confirma horário "14:00".
2.  Bot cria `Agendamento(status='pendente_pagamento')`.
3.  Bot chama API de Pagamento -> Gera QRCode PIX único.
4.  Bot manda imagem do QR Code + Código Copia e Cola.
5.  Webhook do Pagamento avisa Django -> "Pago".
6.  Django confirma Agendamento e Bot manda: "Pagamento recebido! Sua consulta das 14:00 está confirmada ✅".

---
