import { api } from "@/lib/api/axios";
import { PacienteListResponseSchema } from "@/app/schemas/paciente/paciente";

interface GetPacientesParams {
  search?: string;
  limit?: number;
  offset?: number;
}

export async function GetPacientes({ search, limit, offset }: GetPacientesParams) {
  const response = await api.get("/pacientes/", {
    params: {
      search,
      limit,
      offset,
    },
  });
  
  const validated = PacienteListResponseSchema.parse(response.data);
  return validated;
}
