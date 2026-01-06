import { ListAgendamentos } from "@/lib/api/agendamento/agendamentosList";
import { useQuery } from "@tanstack/react-query";

interface UseListAgendamentosParams {
  motivo?: string;
  pagamento?: string;
  periodo?: string;
  status?: string;
  futuros?: boolean;
  view?: 'minimal' | 'dashboard' | 'full'; // Controla qual serializer usar no backend
}

export function useListAgendamentos(params?: UseListAgendamentosParams) {
  return useQuery({
    queryKey: ["listAgendamentos", params],
    queryFn: () => ListAgendamentos(params),
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
