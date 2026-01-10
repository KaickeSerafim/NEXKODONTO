import { z } from "zod";
import { apiResponseSchema } from "../response/apiResponse";

export const PacienteSchema = z.object({
  id: z.number(),
  nome: z.string(),
  telefone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  dentista: z.number().optional(),
  data_nascimento: z.string().nullable().optional(),
  cpf: z.string().nullable().optional(),
  endereco: z.string().nullable().optional(),
  cidade: z.string().nullable().optional(),
  estado: z.string().nullable().optional(),
  cep: z.string().nullable().optional(),
  observacoes: z.string().nullable().optional(),
});

export type Paciente = z.infer<typeof PacienteSchema>;

export const PaginatedPacienteSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(PacienteSchema),
});

export const PacienteListResponseSchema = apiResponseSchema.extend({
    data: PaginatedPacienteSchema,
});

export type PacienteListResponse = z.infer<typeof PacienteListResponseSchema>;
