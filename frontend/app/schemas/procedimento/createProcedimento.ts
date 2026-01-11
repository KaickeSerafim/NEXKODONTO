import { z } from "zod";

export const CreateProcedimentoSchema = z.object({
  nome: z.string({ required_error: "Nome é obrigatório" }).min(3, "Nome deve ter pelo menos 3 caracteres"),
  duracao_minutos: z.coerce.number({ required_error: "Duração é obrigatória" }).min(1, "Duração deve ser maior que 0"),
  preco_base: z.coerce.number({ required_error: "Preço base é obrigatório" }).min(0, "Preço não pode ser negativo"),
});

export type CreateProcedimentoData = z.infer<typeof CreateProcedimentoSchema>;
