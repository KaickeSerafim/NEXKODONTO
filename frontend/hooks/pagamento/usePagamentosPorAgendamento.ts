import { ListPagamentosPorAgendamento } from "@/lib/api/pagamento/pagamentosPorAgendamento";
import { useQuery } from "@tanstack/react-query";

interface UsePagamentosPorAgendamentoParams {
  agendamentoId: string | number;
  enabled?: boolean;
}

export function usePagamentosPorAgendamento({ 
  agendamentoId, 
  enabled = true 
}: UsePagamentosPorAgendamentoParams) {
  return useQuery({
    queryKey: ["pagamentosPorAgendamento", agendamentoId],
    queryFn: () => ListPagamentosPorAgendamento({ agendamentoId }),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
    enabled: enabled && !!agendamentoId,
  });
}
