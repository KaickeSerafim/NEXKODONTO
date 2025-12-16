import z from "zod";



export const criadoPorDetailSchema = z.object({
  id: z.number(),
  nome: z.string().optional().nullable(),
  username: z.string().nullable(),
  nome_completo: z.string().optional().nullable(),
}).nullable();

export type CriadoPorDetail = z.infer<typeof criadoPorDetailSchema>;