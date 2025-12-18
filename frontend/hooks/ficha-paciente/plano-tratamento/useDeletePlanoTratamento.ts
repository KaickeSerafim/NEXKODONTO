
import { DeletePlanoTratamento } from "@/lib/api/ficha-paciente/plano-tratamento/planoTratamentoDelete";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useDeletePlanoTratamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeletePlanoTratamento,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["plano-tratamento", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["planos-tratamento"] });
      queryClient.invalidateQueries({ queryKey: ["ficha-paciente"] });
    },
  });
}
