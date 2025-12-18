import { z } from "zod";

export const HistoricoMedicoSchema = z.object({
  id: z.number().optional(),
  paciente: z.number(),
  alergias: z.string().nullable().optional(),
  condicoes_medicas: z.string().nullable().optional(),
  medicamentos: z.string().nullable().optional(),
  criado_em: z.string().optional(),
  atualizado_em: z.string().optional(),
});

export const CreateHistoricoMedicoSchema = HistoricoMedicoSchema.omit({
  id: true,
  paciente: true,
  criado_em: true,
  atualizado_em: true,
});

export type HistoricoMedicoType = z.infer<typeof HistoricoMedicoSchema>;
export type CreateHistoricoMedico = z.infer<typeof CreateHistoricoMedicoSchema>;
