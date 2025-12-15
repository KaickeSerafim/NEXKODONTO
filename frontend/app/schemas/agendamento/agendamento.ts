import { z } from "zod";
import { apiResponseSchema } from "../response/apiResponse";


const pacienteDetailSchema = z.object({
  id: z.number(),
  nome: z.string(),
  telefone: z.string().nullable(),
  email: z.string().email().nullable(),
  dentista: z.number(),
});

const dentistaDetailSchema = z.object({
  id: z.number(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  nome_completo: z.string(),
  email: z.string().email(),
});

const criadoPorDetailSchema = z.object({
  id: z.number(),
  username: z.string(),
  nome_completo: z.string(),
});

const pagamentoSchema = z.object({
  id: z.number(),
  agendamento: z.number().nullable().optional(),
  status: z.string(),
  pago_em: z.string().nullable().optional(),
});

export const agendamentoSchema = z.object({
  id: z.number(),
  paciente_id: z.number().optional(),
  paciente_detail: pacienteDetailSchema,
  dentista_detail: dentistaDetailSchema,
  criado_por_detail: criadoPorDetailSchema.nullable(),
  pagamento: z.array(pagamentoSchema).optional().default([]),
  data_hora: z.string(),
  motivo: z.string().nullable(),
  status: z.enum(["agendada", "confirmada", "cancelada", "pendente"]),
  observacoes: z.string().nullable(),
  criado_em: z.string(),
  atualizado_em: z.string(),
});

export const agendamentoResponseSchema = apiResponseSchema.extend({
  data: z.array(agendamentoSchema),
});

export const agendamentoDetailResponseSchema = apiResponseSchema.extend({
  data: agendamentoSchema,
});

export type Agendamento = z.infer<typeof agendamentoSchema>;
export type AgendamentoResponse = z.infer<typeof agendamentoResponseSchema>;
export type AgendamentoDetailResponse = z.infer<typeof agendamentoDetailResponseSchema>;
