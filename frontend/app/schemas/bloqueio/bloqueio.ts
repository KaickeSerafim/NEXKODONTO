import { z } from "zod";
import { apiResponseSchema } from "../response/apiResponse";

export const bloqueioSchema = z.object({
  id: z.number(),
  data: z.string(),
  hora_inicio: z.string().nullable(),
  hora_fim: z.string().nullable(),
  motivo: z.string().nullable(),
});

export const bloqueioListResponseSchema = apiResponseSchema.extend({
  data: z.array(bloqueioSchema),
});

export const bloqueioDetailResponseSchema = apiResponseSchema.extend({
  data: bloqueioSchema,
});

export type Bloqueio = z.infer<typeof bloqueioSchema>;
export type BloqueioListResponse = z.infer<typeof bloqueioListResponseSchema>;
export type BloqueioDetailResponse = z.infer<typeof bloqueioDetailResponseSchema>;
