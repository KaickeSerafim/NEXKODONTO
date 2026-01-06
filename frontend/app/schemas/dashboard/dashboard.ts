import { z } from "zod";
import { apiResponseSchema } from "../response/apiResponse";

// Schema para estatísticas do dashboard
export const dashboardStatsSchema = z.object({
  total_pacientes: z.number(),
  consultas_hoje: z.number(),
  pendentes: z.number(),
  receita_mensal_estimada: z.string(),
});

// Schema minimalista para agendamentos no calendário
export const agendamentoMinimalSchema = z.object({
  id: z.number(),
  paciente_nome: z.string(),
  data_hora: z.string(),
  status: z.string(),
  status_pagamento: z.string().nullable(),
});

// Response do dashboard com stats + próximos agendamentos
export const dashboardResponseSchema = apiResponseSchema.extend({
  data: z.object({
    stats: dashboardStatsSchema,
    proximos_agendamentos: z.array(
      z.object({
        id: z.number(),
        paciente_detail: z.object({
          id: z.number(),
          nome: z.string(),
          telefone: z.string().nullable(),
          email: z.string().nullable(),
        }),
        procedimento_detail: z.object({
          id: z.number(),
          nome: z.string(),
          duracao_minutos: z.number(),
          preco_base: z.string(),
        }).nullable(),
        criado_por_detail: z.object({
          id: z.number(),
          username: z.string(),
          nome_completo: z.string(),
        }).nullable(),
        updated_by_detail: z.object({
          nome_completo: z.string(),
        }).nullable(),
        data_hora: z.string(),
        data_hora_fim: z.string().nullable(),
        motivo: z.string().nullable(),
        status: z.string(),
        observacoes: z.string().nullable(),
        criado_em: z.string(),
        atualizado_em: z.string(),
        pagamento: z.array(z.object({
          id: z.number(),
          status: z.string(),
          pago_em: z.string().nullable(),
        })),
      })
    ),
  }),
});

// Response para lista minimal (calendário)
export const agendamentoMinimalResponseSchema = apiResponseSchema.extend({
  data: z.array(agendamentoMinimalSchema),
});

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;
export type AgendamentoMinimal = z.infer<typeof agendamentoMinimalSchema>;
export type DashboardResponse = z.infer<typeof dashboardResponseSchema>;
export type AgendamentoMinimalResponse = z.infer<typeof agendamentoMinimalResponseSchema>;
