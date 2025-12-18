import { DeletePagamento } from "@/lib/api/pagamento/pagamentoDelete";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeletePagamentoParams {
  id: string | number;
}

export function useDeletePagamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeletePagamentoParams) => DeletePagamento(params),
    onSuccess: (_, variables) => {
      // Invalida cache de pagamentos e do pagamento específico
      queryClient.invalidateQueries({ queryKey: ["listPagamentos"] });
      queryClient.invalidateQueries({ queryKey: ["pagamentoDetail", variables.id] });
    },
  });
}
