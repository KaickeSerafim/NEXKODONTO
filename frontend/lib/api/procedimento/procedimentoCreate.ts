import { api } from "@/lib/api/axios";
import { CreateProcedimentoData } from "@/app/schemas/procedimento/createProcedimento";

export async function CreateProcedimento(data: CreateProcedimentoData) {
  const response = await api.post("/procedimentos/", data);
  return response.data;
}
