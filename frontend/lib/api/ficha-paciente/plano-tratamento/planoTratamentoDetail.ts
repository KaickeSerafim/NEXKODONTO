import { PlanoTratamentoDetailResponseSchema } from "@/app/schemas/ficha-paciente/apiResponse";
import { api } from "@/lib/api/axios";


export async function GetPlanoTratamentoDetail({ id }: { id: number }) {
  const response = await api.get(`/planos-tratamento/${id}/`);
  const validated = PlanoTratamentoDetailResponseSchema.parse(response.data);
  return validated;
}
