
import { PlanoTratamentoUpdate } from "@/lib/api/ficha-paciente/plano-tratamento/planoTratamentoUpdate";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useUpdatePlanoTratamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PlanoTratamentoUpdate,
    onSuccess: (data) => {
      const planoId = data.data.id;
      queryClient.invalidateQueries({ queryKey: ["plano-tratamento", planoId] });
      queryClient.invalidateQueries({ queryKey: ["planos-tratamento"] });
      queryClient.invalidateQueries({ queryKey: ["ficha-paciente"] });
    },
  });
}
