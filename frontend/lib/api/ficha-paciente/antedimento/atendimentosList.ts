import { AtendimentosResponseSchema } from "@/app/schemas/ficha-paciente/apiResponse";
import { api } from "@/lib/api/axios";


export async function ListAtendimentos({ pacienteId }: { pacienteId: number }) {
  const response = await api.get(`/pacientes/${pacienteId}/atendimentos/`);
  const validated = AtendimentosResponseSchema.parse(response.data);
  return validated;
}
