import { api } from "../axios";

export interface SlotDisponibilidade {
  hora: string;
  hora_fim?: string;
  status: 'disponivel' | 'pendente' | 'ocupado' | 'bloqueado';
  paciente: string | null;
  disponivel: boolean;
}

export interface DisponibilidadeResponse {
  data: string;
  slots: SlotDisponibilidade[];
}

export const getDisponibilidade = async (date: string, dentista_id?: number): Promise<DisponibilidadeResponse> => {
  const params = new URLSearchParams();
  if (date) params.append('data', date);
  if (dentista_id) params.append('dentista_id', dentista_id.toString());

  const response = await api.get(`/agendamentos/disponibilidade/?${params.toString()}`);
  return response.data.data;
};
