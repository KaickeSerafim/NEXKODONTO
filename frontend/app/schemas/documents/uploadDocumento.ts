import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "text/plain",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const uploadDocumentoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  paciente: z.number().positive("Paciente é obrigatório"),
  agendamento: z.number().positive().optional(),
  arquivo: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Arquivo deve ter no máximo 10MB")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Apenas arquivos PDF, TXT, PNG, JPG e Word são aceitos"
    ),
  tipo: z.enum(["exame", "raio_x", "foto", "documento", "comprovante"], {
    required_error: "Tipo é obrigatório",
  }),
  descricao: z.string().optional(),
});

export type UploadDocumentoData = z.infer<typeof uploadDocumentoSchema>;
