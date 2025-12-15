import { z } from "zod"



export const atendimentoSchema = z.object({
    id: z.number(),
    nome_paciente: z.string().nullable(),
    tipo_atendimento: z.string().nullable(),
    data_atendimento: z.string().nullable(),
    status_atendimento:z.string().nullable(),
    hora_atendimento: z.string().nullable(),
    observacao_atendimento: z.string().nullable(),
})

export type Atendimento = z.infer<typeof atendimentoSchema>;


