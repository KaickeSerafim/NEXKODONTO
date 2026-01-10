import { api } from "@/lib/api/axios";
import { PacienteListResponseSchema } from "@/app/schemas/paciente/paciente";

interface GetPacientesParams {
  nome?: string;
  limit?: number;
  offset?: number;
}

export async function GetPacientes({ nome, limit, offset }: GetPacientesParams = {}) {
  const response = await api.get("/pacientes/", {
    params: {
      nome,
      limit,
      offset,
    },
  });
  
  const validated = PacienteListResponseSchema.parse(response.data);
  return validated;
}
