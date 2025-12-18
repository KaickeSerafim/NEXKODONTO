import { GetPlanoTratamentoDetail } from "@/lib/api/ficha-paciente/plano-tratamento/planoTratamentoDetail";
import { useQuery } from "@tanstack/react-query";


export function usePlanoTratamentoDetail({ 
  id, 
  enabled = true 
}: { 
  id: number; 
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: ["plano-tratamento", id],
    queryFn: () => GetPlanoTratamentoDetail({ id }),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
