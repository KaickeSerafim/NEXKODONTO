import { UpdatePagamento as UpdatePagamentoAPI } from "@/lib/api/pagamento/pagamentoUpdate";
import { UpdatePagamento } from "@/app/schemas/pagamento/pagamento";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdatePagamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePagamento) => UpdatePagamentoAPI(data),
    onSuccess: (_, variables) => {
      // Invalida cache de pagamentos e do pagamento específico
      queryClient.invalidateQueries({ queryKey: ["listPagamentos"] });
      queryClient.invalidateQueries({ queryKey: ["pagamentoDetail", variables.id] });
    },
  });
}
