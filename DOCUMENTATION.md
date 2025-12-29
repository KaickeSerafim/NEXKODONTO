# NEXKODONTO - Gestão Odontológica Inteligente & Chatbot WhatsApp

![NEXKODONTO](https://img.shields.io/badge/Platform-SaaS-blueviolet?style=for-the-badge)
![Django](https://img.shields.io/badge/Backend-Django%20%7C%20DRF-092E20?style=for-the-badge&logo=django)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-000000?style=for-the-badge&logo=nextdotjs)
![WhatsApp](https://img.shields.io/badge/Integration-WAHA-25D366?style=for-the-badge&logo=whatsapp)

**NEXKODONTO** é uma plataforma SaaS robusta projetada para consultórios odontológicos. O sistema combina gestão clínica eficiente com um chatbot de WhatsApp integrado, permitindo automação de agendamentos, lembretes e interação inteligente com pacientes.

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Framework:** Django 4.2+ & Django REST Framework (DRF)
- **Autenticação:** JWT (JSON Web Token) com armazenamento seguro em Cookies
- **Processamento:** Celery (para tarefas em segundo plano e webhooks)
- **Integração WhatsApp:** API WAHA (WhatsApp HTTP API)

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Estilização:** Tailwind CSS & Shadcn/UI
- **Gerenciamento de Estado/Dados:** TanStack Query (React Query) & Axios
- **Formulários:** React Hook Form & Zod

---

## 🏗️ Arquitetura do Backend

O backend segue uma estrutura modular, onde cada funcionalidade é separada em `apps` dentro da pasta `backend/apps`.

### Conceito: ResponseBuilder
Para garantir que todas as respostas da API sigam um padrão rigoroso e previsível, utilizamos a classe utilitária `ResponseBuilder`.

**Por que usar?**
1. **Padronização:** O frontend sempre recebe o mesmo formato de JSON.
2. **Fluidez:** Facilita a leitura e escrita do código no backend.
3. **Escalabilidade:** Novas informações (metadados, paginação) podem ser adicionadas globalmente.

**Exemplo de Uso:**
```python
def retrieve(self, request, *args, **kwargs):
    instance = self.get_object()
    serializer = self.get_serializer(instance)
    
    return ResponseBuilder() \
        .success("Dados recuperados com sucesso") \
        .with_data(serializer.data) \
        .to_response()
```

**Estrutura da Resposta JSON:**
```json
{
    "status": "success" | "error",
    "message": "Mensagem descritiva da operação",
    "data": { ... },
    "errors": null | [ ... ]
}
```

---

## 📑 Documentação da API

A API é versionada sob o prefixo `/api/v1/`.

### Endpoints Principais
- **Autenticação:** `/api/v1/auth/` (Login, Logout, Me)
- **Gestão Clínica:** `/api/v1/clinic/` (Agendamentos, Pacientes, Dentistas)
- **Documentos:** `/api/v1/documents/` (Fichas de pacientes, Anamnese)
- **Financeiro:** `/api/v1/billing/` (Pagamentos, Faturamento)
- **WhatsApp:** `/api/v1/whatsapp/` (Integração, Configuração do Chatbot)

### Segurança
- Toda a comunicação é protegida por `JWT`.
- Os tokens de acesso são passados via **HTTP-Only Cookies**, mitigando ataques de XSS.
- Middleware personalizado verifica permissões baseadas em roles (Dentista, Recepcionista, etc.).

---

## 🎨 Organização do Frontend

O frontend foi construído visando alta performance e manutenibilidade.

### Estrutura de Pastas (`/frontend`)
- **`app/`**: Utiliza o **App Router** do Next.js.
  - **`(auth)`**: Grupo de rotas para login, cadastro e recuperação de senha.
  - **`(protected)`**: Grupo de rotas protegidas que exigem autenticação (Dashboard, Agenda, Pacientes).
  - **`landing`**: Páginas públicas de marketing.
- **`components/`**: Componentes de UI reutilizáveis (botões, modais, cards).
- **`lib/api/`**: Camada de serviço que isola as chamadas para o backend, organizada por domínio (ex: `lib/api/agendamento`).
- **`hooks/`**: Custom hooks para lógica de interface e fetch de dados.
- **`schemas/`**: Esquemas de validação Zod utilizados em formulários e sincronizados com os tipos do backend.

---

## 💬 Integração WhatsApp (WAHA)

O sistema utiliza a API **WAHA** para conectar instâncias de WhatsApp diretamente ao dashboard do dentista.
- **Webhook Handling:** O backend processa mensagens em tempo real para disparar fluxos do chatbot.
- **Agendamento Automático:** O chatbot pode ler a disponibilidade da agenda e marcar consultas sem intervenção humana.

---

## 🛠️ Como Executar o Projeto

1. **Backend:**
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate # ou .venv\Scripts\activate no Windows
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **WhatsApp (Docker):**
   ```bash
   docker-compose up -d waha
   ```

---

Desenvolvido com ❤️ por [NEXKODONTO Team] desenvolvido por [KAICKE]
