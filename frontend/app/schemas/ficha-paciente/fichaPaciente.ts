import { z } from "zod";
import { HistoricoMedicoSchema } from "./historicoMedico";
import { PlanoTratamentoSchema } from "./planoTratamento";
import { agendamentoSchema } from "../agendamento/agendamento";

export const FichaPacienteSchema = z.object({
  id: z.number(),
  nome: z.string(),
  telefone: z.string().nullable().optional(),
  cpf: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  data_nascimento: z.string().nullable().optional(),
  endereco: z.string().nullable().optional(),
  cidade: z.string().nullable().optional(),
  estado: z.string().nullable().optional(),
  cep: z.string().nullable().optional(),
  observacoes: z.string().nullable().optional(),
  historico_medico: HistoricoMedicoSchema.nullable().optional(),
  planos_tratamento: z.array(PlanoTratamentoSchema).optional().default([]),
  consultas: z.array(agendamentoSchema).optional().default([]),
});

export type FichaPaciente = z.infer<typeof FichaPacienteSchema>;
