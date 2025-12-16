import { DocumentosDetailResponse, documentDetailResponseSchema } from "@/app/schemas/documents/documents";
import { UploadDocumentoData, uploadDocumentoSchema } from "@/app/schemas/documents/uploadDocumento";
import { api } from "../axios";

export async function UploadDocumento(data: UploadDocumentoData): Promise<DocumentosDetailResponse> {
  const validatedData = uploadDocumentoSchema.parse(data);
  try {
    const formData = new FormData();
    formData.append("nome", validatedData.nome);
    formData.append("paciente", validatedData.paciente.toString());
    if (validatedData.agendamento) formData.append("agendamento", validatedData.agendamento.toString());
    formData.append("arquivo", validatedData.arquivo);
    formData.append("tipo", validatedData.tipo);
    if (validatedData.descricao) formData.append("descricao", validatedData.descricao);

    const response = await api.post("documentos/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const validatedResponse = documentDetailResponseSchema.parse(response.data);

    if (validatedResponse.status === "error") {
      throw new Error(validatedResponse.message);
    }

    return validatedResponse;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Erro ao fazer upload do documento");
  }
}
