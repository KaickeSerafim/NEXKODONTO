import { z } from "zod";

export const AtendimentoSchema = z.object({
  id: z.number().optional(),
  agendamento: z.number(),
  agendamento_data: z.string().optional(),
  paciente_nome: z.string().optional(),
  diagnostico: z.string(),
  tratamento_realizado: z.string(),
  proximo_passos: z.string().nullable().optional(),
  criado_em: z.string().optional(),
  atualizado_em: z.string().optional(),
});

export type Atendimento = z.infer<typeof AtendimentoSchema>;
