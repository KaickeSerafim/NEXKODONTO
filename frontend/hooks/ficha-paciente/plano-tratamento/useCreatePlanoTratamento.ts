
import { PlanoTratamentoCreate } from "@/lib/api/ficha-paciente/plano-tratamento/planoTratamentoCreate";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useCreatePlanoTratamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PlanoTratamentoCreate,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["planos-tratamento", variables.pacienteId] });
      queryClient.invalidateQueries({ queryKey: ["ficha-paciente", variables.pacienteId] });
    },
  });
}
