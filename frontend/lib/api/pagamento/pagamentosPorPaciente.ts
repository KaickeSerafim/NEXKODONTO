import { PagamentoResponse, PagamentoResponseSchema } from "@/app/schemas/pagamento/apiResponse";
import { api } from "../axios";

interface PagamentosPorPacienteParams {
  pacienteId: string | number;
}

export async function ListPagamentosPorPaciente(
  params: PagamentosPorPacienteParams
): Promise<PagamentoResponse> {
  try {
    const response = await api.get(`pagamentos/paciente/${params.pacienteId}/`);
    
    const validatedResponse = PagamentoResponseSchema.parse(response.data);

    if (validatedResponse.status === "error") {
      throw new Error(validatedResponse.message);
    }

    return validatedResponse;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Erro ao buscar pagamentos do paciente");
  }
}
