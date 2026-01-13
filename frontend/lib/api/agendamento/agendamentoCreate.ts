import {
  AgendamentoDetailResponse,
  agendamentoDetailResponseSchema,
  CreateAgendamento,
} from "@/app/schemas/agendamento/agendamento";
import { api } from "../axios";

export async function CreateAgendamentoApi(
  data: CreateAgendamento
): Promise<AgendamentoDetailResponse> {
  try {
    const response = await api.post("agendamentos/", data);
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
    throw new Error(error.message || "Erro ao criar agendamento");
  }
}
