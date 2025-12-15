import { ListAgendamentos } from "@/lib/api/agendamento/agendamentosList";
import { useQuery } from "@tanstack/react-query";

export function useListAgendamentos() {
  return useQuery({
    queryKey: ["listAgendamentos"],
    queryFn: ListAgendamentos,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
