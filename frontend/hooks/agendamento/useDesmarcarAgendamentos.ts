import { desmarcarAgendamentos } from "@/lib/api/agendamento/desmarcarAgendamentos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DesmarcarAgendamentosParams {
  agendamento_id?: number;
  agendamento_ids?: number[];
}

export function useDesmarcarAgendamentos() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DesmarcarAgendamentosParams) => desmarcarAgendamentos(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listAgendamentos"] });
    },
  });
}
