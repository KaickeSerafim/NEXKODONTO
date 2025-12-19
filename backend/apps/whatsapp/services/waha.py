import requests
import logging

class WahaService:
    def __init__(self):
        # URL interna do container na rede Docker
        self.__api_url = 'http://waha:3000'
        self.headers = {
            'Content-Type': 'application/json',
        }

    def start_session(self, session_name):
        """Inicia uma nova sessão no WAHA"""
        url = f'{self.__api_url}/api/sessions'
        payload = {
            "name": session_name,
            "config": {
                "webhooks": [
                    {
                        "url": "http://django:8000/api/v1/whatsapp/webhook/",
                        "events": ["message", "session.status"]
                    }
                ]
            }
        }
        try:
            response = requests.post(url, json=payload, headers=self.headers)
            return response.json()
        except requests.RequestException as e:
            logging.error(f"Erro ao iniciar sessão WAHA: {e}")
            return None

    def get_qr_code(self, session_name):
        """Recupera o QR Code em imagem (buffer)"""
        url = f'{self.__api_url}/api/sessions/{session_name}/auth/qr?format=image'
        try:
            response = requests.get(url)
            if response.status_code == 200:
                return response.content
            return None
        except requests.RequestException as e:
            logging.error(f"Erro ao buscar QR Code: {e}")
            return None

    def send_message(self, chat_id, message, session='default'):
        url = f'{self.__api_url}/api/sendText'
        payload = {
            'session': session,
            'chatId': chat_id,
            'text': message,
        }
        try:
            requests.post(url, json=payload, headers=self.headers)
        except requests.RequestException as e:
            logging.error(f"Erro ao enviar mensagem WAHA: {e}")

    def start_typing(self, chat_id, session='default'):
        url = f'{self.__api_url}/api/startTyping'
        payload = {
            'session': session,
            'chatId': chat_id,
        }
        try:
            requests.post(url, json=payload, headers=self.headers)
        except requests.RequestException:
            pass

    def stop_typing(self, chat_id, session='default'):
        url = f'{self.__api_url}/api/stopTyping'
        payload = {
            'session': session,
            'chatId': chat_id,
        }
        try:
            requests.post(url, json=payload, headers=self.headers)
        except requests.RequestException:
            pass
