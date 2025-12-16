import { DocumentosResponse, documentsResponseSchema } from "@/app/schemas/documents/documents";
import { api } from "../axios";

interface ListDocumentosParams {
  nome?: string;
  tipo?: string;
  paciente?: number;
  agendamento?: number;
  data_inicio?: string;
  data_fim?: string;
}

export async function DocumentosPacienteList(params?: ListDocumentosParams): Promise<DocumentosResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.tipo) queryParams.append("tipo", params.tipo);
    if (params?.nome) queryParams.append("tipo", params.nome);
    if (params?.paciente) queryParams.append("paciente", params.paciente.toString());
    if (params?.agendamento) queryParams.append("agendamento", params.agendamento.toString());
    if (params?.data_inicio) queryParams.append("data_inicio", params.data_inicio);
    if (params?.data_fim) queryParams.append("data_fim", params.data_fim);
    
    const url = `documentos/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    console.log("DocumentosPacienteList URL:", url);
    console.log("DocumentosPacienteList params:", params);
    const response = await api.get(url);
    console.log("DocumentosPacienteList response:", response.data);

    const validatedResponse = documentsResponseSchema.parse(response.data);

    if (validatedResponse.status === "error") {
      throw new Error(validatedResponse.message);
    }

    return validatedResponse;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Erro ao buscar documentos");
  }
}
