import { z } from "zod";
import { apiResponseSchema } from "../response/apiResponse";

export const ProcedimentoSchema = z.object({
  id: z.number(),
  nome: z.string(),
  duracao_minutos: z.number(),
  preco_base: z.string(), // DecimalField usually comes as string from DRF
  dentista: z.number().optional(),
  criado_em: z.string().optional(),
  atualizado_em: z.string().optional(),
});

export type Procedimento = z.infer<typeof ProcedimentoSchema>;

export const PaginatedProcedimentoSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(ProcedimentoSchema),
});

export const ProcedimentoListResponseSchema = apiResponseSchema.extend({
    data: PaginatedProcedimentoSchema,
});

export type ProcedimentoListResponse = z.infer<typeof ProcedimentoListResponseSchema>;
