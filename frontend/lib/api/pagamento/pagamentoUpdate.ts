import { PagamentoDetailResponse, PagamentoDetailResponseSchema } from "@/app/schemas/pagamento/apiResponse";
import { UpdatePagamento } from "@/app/schemas/pagamento/pagamento";
import { api } from "../axios";

export async function UpdatePagamento(data: UpdatePagamento): Promise<PagamentoDetailResponse> {
  try {
    if (!data.id) {
      throw new Error("ID do pagamento é obrigatório");
    }

    const response = await api.put(`pagamentos/${data.id}/`, data);
    
    const validatedResponse = PagamentoDetailResponseSchema.parse(response.data);

    if (validatedResponse.status === "error") {
      throw new Error(validatedResponse.message);
    }

    return validatedResponse;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error.response?.data?.errors) {
      const errorMessages = Object.values(error.response.data.errors).flat().join(", ");
      throw new Error(errorMessages);
    }
    throw new Error(error.message || "Erro ao atualizar pagamento");
  }
}
