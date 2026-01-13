import { CreateAgendamento } from "@/app/schemas/agendamento/agendamento";
import { CreateAgendamentoApi } from "@/lib/api/agendamento/agendamentoCreate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateAgendamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAgendamento) => CreateAgendamentoApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listAgendamentos"] });
    },
  });
}
