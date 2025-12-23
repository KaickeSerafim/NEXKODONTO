import {  AgendamentoResponse, agendamentoResponseSchema } from "@/app/schemas/agendamento/agendamento";
import { api } from "../axios";

interface ListAgendamentosParams {
  motivo?: string;
  pagamento?: string;
  periodo?: string;
  status?: string;
  futuros?: boolean;
}

export async function ListAgendamentos(params?: ListAgendamentosParams): Promise<AgendamentoResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.motivo && params.motivo !== "todos") queryParams.append("motivo", params.motivo);
    if (params?.pagamento && params.pagamento !== "todos") queryParams.append("pagamento", params.pagamento);
    if (params?.periodo && params.periodo !== "todos") queryParams.append("periodo", params.periodo);
    if (params?.status && params.status !== "todos") queryParams.append("status", params.status);
    if (params?.futuros) queryParams.append("futuros", "true");
    
    const url = `agendamentos/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    const response = await api.get(url);
    

  
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
