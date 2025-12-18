import { z } from "zod";

// Enums para métodos e status de pagamento
export enum MetodoPagamento {
  PIX = "pix",
  DINHEIRO = "dinheiro",
  CARTAO = "cartao",
  BOLETO = "boleto",
  OUTRO = "outro",
}

export enum StatusPagamento {
  PAGO = "pago",
  PENDENTE = "pendente",
  CANCELADO = "cancelado",
  OUTRO = "outro",
}

// Labels para exibição
export const MetodoPagamentoLabels: Record<MetodoPagamento, string> = {
  [MetodoPagamento.PIX]: "PIX",
  [MetodoPagamento.DINHEIRO]: "Dinheiro",
  [MetodoPagamento.CARTAO]: "Cartão",
  [MetodoPagamento.BOLETO]: "Boleto",
  [MetodoPagamento.OUTRO]: "Outro",
};

export const StatusPagamentoLabels: Record<StatusPagamento, string> = {
  [StatusPagamento.PAGO]: "Pago",
  [StatusPagamento.PENDENTE]: "Pendente",
  [StatusPagamento.CANCELADO]: "Cancelado",
  [StatusPagamento.OUTRO]: "Outro",
};

// Schema principal do pagamento
export const PagamentoSchema = z.object({
  id: z.number().optional(),
  paciente: z.number().optional().nullable(),
  dentista: z.number().optional().nullable(),
  agendamento: z.number().optional().nullable(),
  // Backend retorna valor como string (Decimal), z.coerce converte automaticamente
  valor: z.coerce.number(),
  status: z.nativeEnum(StatusPagamento, {
    errorMap: () => ({ message: "Status de pagamento inválido" }),
  }),
  // Método pode ser null no backend
  metodo: z.nativeEnum(MetodoPagamento, {
    errorMap: () => ({ message: "Método de pagamento inválido" }),
  }).nullable().optional(),
  // Comprovante pode ser string (URL) ou null
  comprovante: z.string().nullable().optional(),
  observacoes: z.string().nullable().optional(),
  // Backend pode retornar datetime em diferentes formatos
  pago_em: z.string().nullable().optional(),
});

// Schema para criar pagamento
export const CreatePagamentoSchema = PagamentoSchema.omit({
  id: true,
  pago_em: true,
});

// Schema para atualizar pagamento
export const UpdatePagamentoSchema = PagamentoSchema.partial().required({ id: true });

// Tipos TypeScript inferidos
export type Pagamento = z.infer<typeof PagamentoSchema>;
export type CreatePagamento = z.infer<typeof CreatePagamentoSchema>;
export type UpdatePagamento = z.infer<typeof UpdatePagamentoSchema>;
