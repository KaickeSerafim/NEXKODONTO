import {
  AgendamentoDetailResponse,
  agendamentoDetailResponseSchema,
} from "@/app/schemas/agendamento/agendamento";
import { api } from "../axios";

interface UpdateAgendamentoData {
  data_hora?: string;
  motivo?: string;
  status?: string;
  observacoes?: string;
}

export async function UpdateAgendamento(
  id: number,
  data: UpdateAgendamentoData
): Promise<AgendamentoDetailResponse> {
  try {
    const response = await api.put(`agendamentos/${id}/`, data);
    const validatedResponse = agendamentoDetailResponseSchema.parse(
      response.data
    );

    if (validatedResponse.status === "error") {
      throw new Error(validatedResponse.message);
    }

    return validatedResponse;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Erro ao atualizar agendamento");
  }
}
