import { AgendamentoDetailResponse, agendamentoDetailResponseSchema } from "@/app/schemas/agendamento/agendamento";
import { api } from "../axios";

export async function getAgendamentoDetail(id: number): Promise<AgendamentoDetailResponse> {
  try {
    const response = await api.get(`agendamentos/${id}/`);
    const validatedResponse = agendamentoDetailResponseSchema.parse(response.data);

    if (validatedResponse.status === "error") {
      throw new Error(validatedResponse.message);
    }

    return validatedResponse;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Erro ao buscar detalhes do agendamento");
  }
}
