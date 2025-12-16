import z from "zod";



export const dentistaDetailSchema = z.object({
  id: z.number(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  nome_completo: z.string(),
  email: z.string().email(),
});

export type DentistaDetail = z.infer<typeof dentistaDetailSchema>;