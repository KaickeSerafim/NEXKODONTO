import {
  AgendamentoDetailResponse,
  agendamentoDetailResponseSchema,
  CreateAgendamento,
} from "@/app/schemas/agendamento/agendamento";
import { api } from "../axios";

export async function CreateAgendamentoApi(
  data: CreateAgendamento
): Promise<AgendamentoDetailResponse> {
  const response = await api.post("agendamentos/", data);
  const validatedResponse = agendamentoDetailResponseSchema.parse(
    response.data
  );

  if (validatedResponse.status === "error") {
    // Se o backend retornou status: error (mesmo com HTTP 200 ou 400),
    // lançamos um erro com a estrutura que o frontend espera (contendo response.data)
    const customError: any = new Error(validatedResponse.message);
    customError.response = {
        data: response.data,
        status: response.status,
    };
    throw customError;
  }

  return validatedResponse;
}
