import { z } from "zod";

export const travarDiaFormSchema = z.object({
  motivo: z.string().optional().default(""),
  tipo_bloqueio: z.enum(["dia_todo", "horario"]).default("dia_todo"),
  hora_inicio: z.string().optional(),
  hora_fim: z.string().optional(),
}).refine((data) => {
  if (data.tipo_bloqueio === "horario") {
    return !!data.hora_inicio && !!data.hora_fim;
  }
  return true;
}, {
  message: "Horários de início e fim são obrigatórios para bloqueio por horário",
  path: ["hora_inicio"]
});

export type TravarDiaFormValues = z.infer<typeof travarDiaFormSchema>;
