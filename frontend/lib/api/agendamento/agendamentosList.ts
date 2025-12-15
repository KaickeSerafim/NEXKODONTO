import {  AgendamentoResponse, agendamentoResponseSchema } from "@/app/schemas/agendamento/agendamento";
import { api } from "../axios";


export async function ListAgendamentos(): Promise<AgendamentoResponse> {
  try {
    const response = await api.get("agendamentos/");

    // Valida resposta com Zod
    const validatedResponse = agendamentoResponseSchema.parse(response.data);

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
