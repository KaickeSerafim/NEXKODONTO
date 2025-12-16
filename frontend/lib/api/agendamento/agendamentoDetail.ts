import {
    AgendamentoDetailResponse,
  agendamentoDetailResponseSchema,

} from "@/app/schemas/agendamento/agendamento";
import { api } from "../axios";

interface AgendamentoIdParams {
id: string;
}

export async function AgendamentoDetail(AgendamentoIdParams : AgendamentoIdParams ): Promise<AgendamentoDetailResponse> {
  try {
   

    const url = `agendamentos/${AgendamentoIdParams.id}`;
      

    const response = await api.get(url);

    const validatedResponse = agendamentoDetailResponseSchema.parse(response.data);

    if (validatedResponse.status === "error") {
      throw new Error(validatedResponse.message);
    }

    return validatedResponse;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Erro ao fazer busca de agendamentos");
  }
}
