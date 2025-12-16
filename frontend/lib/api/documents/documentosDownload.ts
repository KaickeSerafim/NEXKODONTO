import { api } from "../axios";

export async function DocumentosDownload(id: number): Promise<Blob> {
  const response = await api.get(`documentos/${id}/download/`, {
    responseType: 'blob',
  });
  return response.data;
}
