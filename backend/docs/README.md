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
