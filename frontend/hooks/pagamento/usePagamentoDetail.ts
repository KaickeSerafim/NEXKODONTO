import { PagamentoDetail } from "@/lib/api/pagamento/pagamentoDetail";
import { useQuery } from "@tanstack/react-query";

interface UsePagamentoDetailParams {
  id: string | number;
  enabled?: boolean;
}

export function usePagamentoDetail({ id, enabled = true }: UsePagamentoDetailParams) {
  return useQuery({
    queryKey: ["pagamentoDetail", id],
    queryFn: () => PagamentoDetail({ id }),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
    enabled: enabled && !!id,
  });
}
