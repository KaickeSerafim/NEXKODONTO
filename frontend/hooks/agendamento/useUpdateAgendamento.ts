import { UpdateAgendamento } from "@/lib/api/agendamento/agendamentoUpdate";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useUpdateAgendamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => UpdateAgendamento(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listAgendamentos"] });
    },
  });
}
