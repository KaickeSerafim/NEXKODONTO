import { z } from "zod";

export enum PrioridadeTratamento {
  ALTA = "alta",
  MEDIA = "media",
  BAIXA = "baixa",
}

export const PrioridadeTratamentoLabels: Record<PrioridadeTratamento, string> = {
  [PrioridadeTratamento.ALTA]: "Alta",
  [PrioridadeTratamento.MEDIA]: "Média",
  [PrioridadeTratamento.BAIXA]: "Baixa",
};

export const PlanoTratamentoSchema = z.object({
  id: z.number().optional(),
  paciente: z.number(),
  dentista: z.number().optional(),
  dentista_nome: z.string().optional(),
  prioridade: z.nativeEnum(PrioridadeTratamento),
  descricao: z.string().nullable().optional(),
  custo_estimado: z.coerce.number(),
  criado_em: z.string().optional(),
  atualizado_em: z.string().optional(),
});

export const CreatePlanoTratamentoSchema = PlanoTratamentoSchema.omit({
  id: true,
  paciente: true,
  dentista: true,
  dentista_nome: true,
  criado_em: true,
  atualizado_em: true,
});

export const UpdatePlanoTratamentoSchema = PlanoTratamentoSchema.partial().required({ id: true });

export type PlanoTratamento = z.infer<typeof PlanoTratamentoSchema>;
export type CreatePlanoTratamento = z.infer<typeof CreatePlanoTratamentoSchema>;
export type UpdatePlanoTratamento = z.infer<typeof UpdatePlanoTratamentoSchema>;
