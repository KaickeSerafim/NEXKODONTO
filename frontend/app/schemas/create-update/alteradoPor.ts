import z from "zod";




export const alteradoPorDetailSchema = z.object({
  nome_completo: z.string(),
}).nullable();


export type AlteradoPorDetail = z.infer<typeof alteradoPorDetailSchema>;