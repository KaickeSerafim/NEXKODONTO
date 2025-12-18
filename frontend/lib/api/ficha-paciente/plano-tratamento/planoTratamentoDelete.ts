import { api } from "@/lib/api/axios";

export async function DeletePlanoTratamento({ id }: { id: number }) {
  await api.delete(`/planos-tratamento/${id}/`);
}
