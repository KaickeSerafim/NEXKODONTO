import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePaciente } from "@/lib/api/paciente/pacienteCreate";
import { sucessoCriarPaciente, erroCriarPaciente } from "@/lib/toast/paciente";
import { parseBackendError } from "@/lib/utils/error-parser";

export function useCreatePaciente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreatePaciente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
      sucessoCriarPaciente();
    },
    onError: (error: any) => {
      const message = parseBackendError(error);
      erroCriarPaciente(message);
    },
  });
}
