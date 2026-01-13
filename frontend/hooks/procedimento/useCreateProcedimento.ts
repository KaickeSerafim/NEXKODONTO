import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProcedimento } from "@/lib/api/procedimento/procedimentoCreate";
import { sucessoCriarProcedimento, erroCriarProcedimento } from "@/lib/toast/procedimento";
import { parseBackendError } from "@/lib/utils/error-parser";

export function useCreateProcedimento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateProcedimento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["procedimentos"] });
      sucessoCriarProcedimento();
    },
    onError: (error: any) => {
      const message = parseBackendError(error);
      erroCriarProcedimento(message);
    },
  });
}
