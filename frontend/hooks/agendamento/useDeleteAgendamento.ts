
import { AgendamentoDelete } from "@/lib/api/agendamento/agendamentoDelete";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAgendamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ agendamentoId }: { agendamentoId: number }) => AgendamentoDelete({ agendamentoId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listAgendamentos"] });
    },
  });
}
