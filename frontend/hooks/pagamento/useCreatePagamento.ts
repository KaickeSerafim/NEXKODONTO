import { CreatePagamento as CreatePagamentoAPI } from "@/lib/api/pagamento/pagamentoCreate";
import { CreatePagamento } from "@/app/schemas/pagamento/pagamento";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePagamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePagamento) => CreatePagamentoAPI(data),
    onSuccess: () => {
      // Invalida cache de pagamentos para refetch automático
      queryClient.invalidateQueries({ queryKey: ["listPagamentos"] });
    },
  });
}
