import { api } from "../axios";

export async function DocumentosDelete(id: number): Promise<void> {
  await api.delete(`documentos/${id}/`);
}
