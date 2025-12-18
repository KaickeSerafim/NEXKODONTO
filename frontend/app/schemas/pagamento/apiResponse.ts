import { z } from "zod";
import { PagamentoSchema } from "./pagamento";

// Schema de resposta para lista de pagamentos
export const PagamentoResponseSchema = z.object({
  status: z.enum(["success", "error"]),
  message: z.string(),
  data: z.array(PagamentoSchema).nullable(),
  errors: z.any().nullable(),
});

// Schema de resposta para um pagamento específico
export const PagamentoDetailResponseSchema = z.object({
  status: z.enum(["success", "error"]),
  message: z.string(),
  data: PagamentoSchema.nullable(),
  errors: z.any().nullable(),
});

// Tipos TypeScript inferidos
export type PagamentoResponse = z.infer<typeof PagamentoResponseSchema>;
export type PagamentoDetailResponse = z.infer<typeof PagamentoDetailResponseSchema>;
