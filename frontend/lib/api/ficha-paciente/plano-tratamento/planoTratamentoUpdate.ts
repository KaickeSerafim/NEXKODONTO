import { PlanoTratamentoDetailResponseSchema } from "@/app/schemas/ficha-paciente/apiResponse";
import { UpdatePlanoTratamento } from "@/app/schemas/ficha-paciente/planoTratamento";
import { api } from "@/lib/api/axios";


export async function PlanoTratamentoUpdate({ data }: { data: UpdatePlanoTratamento }) {
  const { id, ...updateData } = data;
  const response = await api.put(`/planos-tratamento/${id}/`, updateData);
  const validated = PlanoTratamentoDetailResponseSchema.parse(response.data);
  return validated;
}
