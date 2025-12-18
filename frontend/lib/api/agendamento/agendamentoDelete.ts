
import { apiResponseSchema } from "@/app/schemas/response/apiResponse";
import { api } from "@/lib/api/axios";

export async function AgendamentoDelete({ 
  agendamentoId 
}: { 
  agendamentoId: number; 
}) {
  const response = await api.delete(`/agendamentos/${agendamentoId}/`);


  if (response.status === 204) {
    return {
      status: "success" as const,
      message: "Agendamento deletado com sucesso",
      data: null,
      errors: null
    };
  }

  const validated = apiResponseSchema.parse(response.data);
  return validated;
}
