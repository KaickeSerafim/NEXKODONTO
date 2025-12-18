import { PlanoTratamentoResponseSchema } from "@/app/schemas/ficha-paciente/apiResponse";
import { api } from "@/lib/api/axios";


export async function ListPlanosTratamento({ pacienteId }: { pacienteId: number }) {
  const response = await api.get(`/pacientes/${pacienteId}/planos-tratamento/`);
  const validated = PlanoTratamentoResponseSchema.parse(response.data);
  return validated;
}
