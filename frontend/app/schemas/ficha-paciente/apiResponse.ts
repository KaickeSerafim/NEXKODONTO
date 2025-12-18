import { z } from "zod";
import { apiResponseSchema } from "../response/apiResponse";
import { HistoricoMedicoSchema } from "./historicoMedico";
import { PlanoTratamentoSchema } from "./planoTratamento";
import { AtendimentoSchema } from "./atendimento";
import { FichaPacienteSchema } from "./fichaPaciente";

// Histórico Médico
export const HistoricoMedicoResponseSchema = apiResponseSchema.extend({
  data: HistoricoMedicoSchema,
});

// Plano de Tratamento
export const PlanoTratamentoResponseSchema = apiResponseSchema.extend({
  data: z.array(PlanoTratamentoSchema),
});

export const PlanoTratamentoDetailResponseSchema = apiResponseSchema.extend({
  data: PlanoTratamentoSchema,
});

// Atendimentos
export const AtendimentosResponseSchema = apiResponseSchema.extend({
  data: z.array(AtendimentoSchema),
});

// Ficha Completa
export const FichaPacienteResponseSchema = apiResponseSchema.extend({
  data: FichaPacienteSchema,
});

// Types
export type HistoricoMedicoResponse = z.infer<typeof HistoricoMedicoResponseSchema>;
export type PlanoTratamentoResponse = z.infer<typeof PlanoTratamentoResponseSchema>;
export type PlanoTratamentoDetailResponse = z.infer<typeof PlanoTratamentoDetailResponseSchema>;
export type AtendimentosResponse = z.infer<typeof AtendimentosResponseSchema>;
export type FichaPacienteResponse = z.infer<typeof FichaPacienteResponseSchema>;
