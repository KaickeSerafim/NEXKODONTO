import { api } from "../axios";
import { DocumentosDetailResponse, documentDetailResponseSchema } from "@/app/schemas/documents/documents";

interface UpdateDocumentoParams {
  id: number;
  nome?: string;
  descricao?: string;
  tipo?: string;
}

export async function DocumentosUpdate({ id, ...data }: UpdateDocumentoParams): Promise<DocumentosDetailResponse> {
  const response = await api.put(`documentos/${id}/`, data);
  return documentDetailResponseSchema.parse(response.data);
}
