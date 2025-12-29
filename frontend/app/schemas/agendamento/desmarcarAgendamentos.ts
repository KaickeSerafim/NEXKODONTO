import { z } from "zod";

// Schema para um resultado individual de desmarcação
const desmarcarResultadoSchema = z.object({
  agendamento_id: z.number(),
  status: z.string(),
  active: z.boolean(),
  motivo: z.string(),
  atendimento_id: z.number(),
  atendimento_criado: z.boolean(),
});

// Schema para um erro individual
const desmarcarErroSchema = z.object({
  agendamento_id: z.number(),
  erro: z.string(),
});

// Schema para os dados da resposta
const desmarcarDataSchema = z.object({
  resultados: z.array(desmarcarResultadoSchema),
  erros: z.array(desmarcarErroSchema),
  total_processados: z.number(),
  total_erros: z.number(),
  total_solicitados: z.number(),
});

// Schema para a resposta completa da API
export const desmarcarAgendamentosResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: desmarcarDataSchema,
});

// Tipos TypeScript inferidos
export type DesmarcarResultado = z.infer<typeof desmarcarResultadoSchema>;
export type DesmarcarErro = z.infer<typeof desmarcarErroSchema>;
export type DesmarcarData = z.infer<typeof desmarcarDataSchema>;
export type DesmarcarAgendamentosResponse = z.infer<typeof desmarcarAgendamentosResponseSchema>;
