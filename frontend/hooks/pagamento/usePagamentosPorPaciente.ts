import { ListPagamentosPorPaciente } from "@/lib/api/pagamento/pagamentosPorPaciente";
import { useQuery } from "@tanstack/react-query";

interface UsePagamentosPorPacienteParams {
  pacienteId: string | number;
  enabled?: boolean;
}

export function usePagamentosPorPaciente({ 
  pacienteId, 
  enabled = true 
}: UsePagamentosPorPacienteParams) {
  return useQuery({
    queryKey: ["pagamentosPorPaciente", pacienteId],
    queryFn: () => ListPagamentosPorPaciente({ pacienteId }),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
    enabled: enabled && !!pacienteId,
  });
}
