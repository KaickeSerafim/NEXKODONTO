import { PagamentoDetailResponse, PagamentoDetailResponseSchema } from "@/app/schemas/pagamento/apiResponse";
import { api } from "../axios";

interface PagamentoIdParams {
  id: string | number;
}

export async function PagamentoDetail(params: PagamentoIdParams): Promise<PagamentoDetailResponse> {
  try {
    const url = `pagamentos/${params.id}/`;
    
    const response = await api.get(url);
    
    const validatedResponse = PagamentoDetailResponseSchema.parse(response.data);

    if (validatedResponse.status === "error") {
      throw new Error(validatedResponse.message);
    }

    return validatedResponse;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Erro ao buscar detalhes do pagamento");
  }
}
