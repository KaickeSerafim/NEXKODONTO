import { UpdateHistoricoMedico } from "@/lib/api/ficha-paciente/historico-medico/historicoMedicoUpdate";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useUpdateHistoricoMedico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateHistoricoMedico,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["historico-medico", variables.pacienteId] });
      queryClient.invalidateQueries({ queryKey: ["ficha-paciente", variables.pacienteId] });
    },
  });
}
