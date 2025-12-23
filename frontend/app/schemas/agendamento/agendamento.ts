import { z } from "zod";
import { apiResponseSchema } from "../response/apiResponse";


const pacienteDetailSchema = z.object({
  id: z.number(),
  nome: z.string(),
  telefone: z.string().nullable(),
  email: z.string().email().or(z.literal("")).nullable(),
  dentista: z.number(),
});

const procedimentoDetailSchema = z.object({
  id: z.number(),
  nome: z.string(),
  duracao_minutos: z.number(),
  preco_base: z.union([z.number(), z.string()]).transform((val) => Number(val)),
  criado_em: z.string(),
  atualizado_em: z.string().optional(),
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

const alteradoPorDetailSchema = z.object({
  nome_completo: z.string(),
}).nullable();

export const agendamentoSchema = z.object({
  id: z.number(),
  paciente_id: z.number().optional(),
  paciente_detail: pacienteDetailSchema,
  procedimento_id: z.number().optional(),
  procedimento_detail: procedimentoDetailSchema,
  dentista_detail: dentistaDetailSchema,
  criado_por_detail: criadoPorDetailSchema.nullable(),
  updated_by_detail: alteradoPorDetailSchema,
  pagamento: z.array(pagamentoSchema).optional().default([]),
  data_hora: z.string(),
  data_hora_fim: z.string().nullable().optional(),
  motivo: z.string().nullable(),
  status: z.string(),
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
