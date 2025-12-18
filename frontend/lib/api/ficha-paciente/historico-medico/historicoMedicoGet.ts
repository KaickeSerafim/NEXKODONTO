import { HistoricoMedicoResponseSchema } from "@/app/schemas/ficha-paciente/apiResponse";
import { api } from "@/lib/api/axios";


export async function GetHistoricoMedico({ pacienteId }: { pacienteId: number }) {
  const response = await api.get(`/pacientes/${pacienteId}/historico-medico/`);
  const validated = HistoricoMedicoResponseSchema.parse(response.data);
  return validated;
}
