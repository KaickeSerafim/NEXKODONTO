import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProcedimento } from "@/lib/api/procedimento/procedimentoCreate";
import { toast } from "sonner";

export function useCreateProcedimento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateProcedimento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["procedimentos"] });
      toast.success("Procedimento cadastrado com sucesso!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Erro ao cadastrar procedimento";
      toast.error(message);
    },
  });
}
