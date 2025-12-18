import { PlanoTratamentoDetailResponseSchema } from "@/app/schemas/ficha-paciente/apiResponse";
import { CreatePlanoTratamento } from "@/app/schemas/ficha-paciente/planoTratamento";
import { api } from "@/lib/api/axios";


export async function PlanoTratamentoCreate({ 
  pacienteId, 
  data 
}: { 
  pacienteId: number; 
  data: CreatePlanoTratamento;
}) {
  const response = await api.post(`/pacientes/${pacienteId}/planos-tratamento/`, data);
  const validated = PlanoTratamentoDetailResponseSchema.parse(response.data);
  return validated;
}
