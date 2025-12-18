import { FichaPacienteResponseSchema } from "@/app/schemas/ficha-paciente/apiResponse";
import { api } from "@/lib/api/axios";


export async function GetFichaPaciente({ pacienteId }: { pacienteId: number }) {
  const response = await api.get(`/pacientes/${pacienteId}/ficha/`);
  const validated = FichaPacienteResponseSchema.parse(response.data);
  return validated;
}
