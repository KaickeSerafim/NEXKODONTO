import { api } from "@/lib/api/axios";
import { ProcedimentoListResponseSchema } from "@/app/schemas/procedimento/procedimento";

interface GetProcedimentosParams {
  nome?: string;
  limit?: number;
  offset?: number;
}

export async function GetProcedimentos({ nome, limit, offset }: GetProcedimentosParams = {}) {
  const response = await api.get("/procedimentos/", {
    params: {
      nome,
      limit,
      offset,
    },
  });
  
  const validated = ProcedimentoListResponseSchema.parse(response.data);
  return validated;
}
