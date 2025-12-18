import { ListPagamentos } from "@/lib/api/pagamento/pagamentosList";
import { useQuery } from "@tanstack/react-query";

export function useListPagamentos() {
  return useQuery({
    queryKey: ["listPagamentos"],
    queryFn: () => ListPagamentos(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
}
