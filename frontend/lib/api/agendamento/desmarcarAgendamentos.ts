import { api } from "../axios";
import { 
  desmarcarAgendamentosResponseSchema,
  DesmarcarAgendamentosResponse 
} from "@/app/schemas/agendamento/desmarcarAgendamentos";

interface DesmarcarAgendamentosData {
  agendamento_id?: number;
  agendamento_ids?: number[];
}

export async function desmarcarAgendamentos(
  data: DesmarcarAgendamentosData
): Promise<DesmarcarAgendamentosResponse> {
  try {
    const response = await api.post("agendamentos/desmarcar/", data);
    
    // Valida a resposta com o schema Zod
    const validatedResponse = desmarcarAgendamentosResponseSchema.parse(response.data);
    
    if (validatedResponse.status !== "success") {
      throw new Error(validatedResponse.message || "Erro ao desmarcar agendamentos");
    }

    return validatedResponse;
  } catch (error: any) {
    // Se for erro de validação do Zod
    if (error.name === 'ZodError') {
      console.error('Erro de validação da resposta:', error);
      throw new Error("Resposta da API inválida");
    }
    
    // Se for erro da API
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error(error.message || "Erro ao desmarcar agendamentos");
  }
}

