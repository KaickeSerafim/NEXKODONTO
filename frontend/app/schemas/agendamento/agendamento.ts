import { z } from "zod";
import { apiResponseSchema } from "../response/apiResponse";


const pacienteDetailSchema = z.object({
  id: z.number().optional(),
  nome: z.string(),
  telefone: z.string().nullable().optional(),
  email: z.string().email().or(z.literal("")).nullable().optional(),
  dentista: z.number().optional(),
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

export const agendamentoMinimalSchema = z.object({
  id: z.number(),
  paciente_detail: z.object({
    id: z.number(),
    nome: z.string(),
  }).optional(),
  procedimento_detail: z.object({
    id: z.number(),
    nome: z.string(),
  }).nullable().optional(),
  data_hora: z.string().optional(),

  status: z.string().optional(),
  valor: z.union([z.number(), z.string()]).optional().transform((val) => val ? Number(val) : undefined),
  pagamento: z.array(z.object({
    id: z.number(),
    status: z.string(),
    pago_em: z.string().nullable().optional(),
  })).optional().default([]),
});

export const agendamentoSchema = z.object({
  id: z.number(),
  paciente_id: z.number().optional(),
  paciente_detail: pacienteDetailSchema.optional(),
  procedimento_id: z.number().optional(),
  procedimento_detail: procedimentoDetailSchema.nullable().optional(),
  dentista_detail: dentistaDetailSchema.optional(),
  criado_por_detail: criadoPorDetailSchema.nullable().optional(),
  updated_by_detail: alteradoPorDetailSchema.optional(),
  pagamento: z.array(pagamentoSchema).optional().default([]),
  data_hora: z.string().optional(),
  data_hora_fim: z.string().nullable().optional(),
  valor: z.union([z.number(), z.string()]).optional().transform((val) => val ? Number(val) : undefined),
  motivo: z.string().nullable().optional(),
  status: z.string().optional(),
  observacoes: z.string().nullable().optional(),
  criado_em: z.string().optional(),
  atualizado_em: z.string().optional(),
});

export const agendamentoUnionSchema = z.union([agendamentoSchema, agendamentoMinimalSchema]);

export const agendamentoResponseSchema = apiResponseSchema.extend({
  data: z.array(agendamentoUnionSchema),
});

export const agendamentoDetailResponseSchema = apiResponseSchema.extend({
  data: agendamentoSchema,
});
export const agendamentoUpdateSchema = agendamentoSchema.omit({
  id: true,
  paciente_detail: true,
  procedimento_detail: true,
  dentista_detail: true,
  criado_por_detail: true,
  updated_by_detail: true,
  pagamento: true,
  criado_em: true,
  atualizado_em: true,
});

export type Agendamento = z.infer<typeof agendamentoUnionSchema>;
export type AgendamentoFull = z.infer<typeof agendamentoSchema>;
export type AgendamentoResponse = z.infer<typeof agendamentoResponseSchema>;
export type AgendamentoDetailResponse = z.infer<typeof agendamentoDetailResponseSchema>;

export type AgendamentoUpdate = z.infer<typeof agendamentoUpdateSchema>;

export const createAgendamentoSchema = z.object({
  paciente_id: z.number(),
  procedimento_id: z.number().nullable().optional(),
  data_hora: z.string(),
  valor: z.number().optional().default(0),
  observacoes: z.string().optional().default(""),
});

export type CreateAgendamento = z.infer<typeof createAgendamentoSchema>;
