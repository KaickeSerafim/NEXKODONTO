import { z } from "zod";

export const CreatePacienteSchema = z.object({
  nome: z.string({ required_error: "Nome é obrigatório" }).min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().optional().nullable(),
  telefone: z.string().optional().nullable(),
  email: z.string().email("E-mail inválido").optional().nullable().or(z.literal("")),
  data_nascimento: z.string().optional().nullable(),
  endereco: z.string().optional().nullable(),
  cidade: z.string().optional().nullable(),
  estado: z.string().optional().nullable(),
  cep: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable(),
});

export type CreatePacienteData = z.infer<typeof CreatePacienteSchema>;
