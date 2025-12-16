import { z } from "zod";
import { apiResponseSchema } from "../response/apiResponse";

import { criadoPorDetailSchema } from "../create-update/criadoPor";








const pacienteDetailSchema = z.object({
  id: z.number(),
  nome: z.string(),
  telefone: z.string().nullable(),
  email: z.string().email().nullable(),
  dentista: z.number(),
});

export const documentSchema = z.object({
  id: z.number(),
  nome: z.string(),
  paciente: z.number(),
  paciente_detail: pacienteDetailSchema,
  agendamento: z.number().nullable(),
  enviado_por_detail: criadoPorDetailSchema.nullable(),
  arquivo: z.string(),
  tipo: z.enum(["exame", "raio_x", "foto", "documento", "comprovante"]),
  descricao: z.string().nullable(),
  criado_em: z.string(),
});

export const documentsResponseSchema = apiResponseSchema.extend({
  data: z.array(documentSchema),
});

export const documentDetailResponseSchema = apiResponseSchema.extend({
  data: documentSchema,
});

export type Documento = z.infer<typeof documentSchema>;
export type DocumentosResponse = z.infer<typeof documentsResponseSchema>;
export type DocumentosDetailResponse = z.infer<typeof documentDetailResponseSchema>;
