import { HistoricoMedicoResponseSchema } from "@/app/schemas/ficha-paciente/apiResponse";
import { CreateHistoricoMedico } from "@/app/schemas/ficha-paciente/historicoMedico";
import { api } from "@/lib/api/axios";


export async function UpdateHistoricoMedico({ 
  pacienteId, 
  data 
}: { 
  pacienteId: number; 
  data: CreateHistoricoMedico;
}) {
  const response = await api.put(`/pacientes/${pacienteId}/historico-medico/`, data);
  const validated = HistoricoMedicoResponseSchema.parse(response.data);
  return validated;
}
