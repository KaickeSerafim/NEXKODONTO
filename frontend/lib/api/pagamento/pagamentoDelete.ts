import { api } from "../axios";

interface DeletePagamentoParams {
  id: string | number;
}

export async function DeletePagamento(params: DeletePagamentoParams): Promise<void> {
  try {
    await api.delete(`pagamentos/${params.id}/`);
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Erro ao deletar pagamento");
  }
}
