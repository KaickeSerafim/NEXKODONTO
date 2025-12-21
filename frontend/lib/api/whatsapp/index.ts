import { api } from "../axios";

// Tipos para a resposta do status do WhatsApp
// Ajuste conforme o retorno real do seu backend/WAHA
export interface WhatsAppStatus {
  status: 'CONNECTED' | 'DISCONNECTED' | 'SCAN_QR_CODE' | 'STARTING' | 'UNKNOWN';
  qrCode?: string; // Base64 ou URL do QR Code
}

export const getWhatsAppStatus = async (): Promise<WhatsAppStatus> => {
  try {
    const response = await api.get('/whatsapp/status/');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar status do WhatsApp:", error);
    return { status: 'UNKNOWN' };
  }
};

export const startWhatsAppSession = async () => {
  const response = await api.post('/whatsapp/session/start/');
  return response.data;
};

export const logoutWhatsAppSession = async () => {
    const response = await api.post('/whatsapp/session/logout/');
    return response.data;
};
