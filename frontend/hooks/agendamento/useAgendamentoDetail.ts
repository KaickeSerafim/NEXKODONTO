import { useQuery } from "@tanstack/react-query";
import { getAgendamentoDetail } from "@/lib/api/agendamento/agendamentoDetail";

export function useAgendamentoDetail(id: number | undefined, enabled: boolean = true) {
  return useQuery({
    queryKey: ["agendamentoDetail", id],
    queryFn: () => getAgendamentoDetail(id!),
    enabled: !!id && enabled,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
