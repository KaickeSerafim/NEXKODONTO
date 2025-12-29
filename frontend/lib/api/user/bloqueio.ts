import { api } from "../axios";
import { 
  bloqueioListResponseSchema, 
  bloqueioDetailResponseSchema,
  Bloqueio,
  BloqueioListResponse,
  BloqueioDetailResponse 
} from "@/app/schemas/bloqueio/bloqueio";

export type { Bloqueio };

export async function listarBloqueios(): Promise<Bloqueio[]> {
  const response = await api.get("bloqueios/");
  const validated = bloqueioListResponseSchema.parse(response.data);
  return validated.data;
}

export async function bloquearDia(
  data: string, 
  motivo?: string, 
  hora_inicio?: string | null, 
  hora_fim?: string | null
): Promise<Bloqueio> {
  const response = await api.post("bloqueios/bloquear/", { data, motivo, hora_inicio, hora_fim });
  const validated = bloqueioDetailResponseSchema.parse(response.data);
  return validated.data;
}

export async function desbloquearDia(data: string): Promise<void> {
  await api.post("bloqueios/desbloquear/", { data });
}
