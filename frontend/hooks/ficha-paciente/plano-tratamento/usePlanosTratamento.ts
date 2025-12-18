import { ListPlanosTratamento } from "@/lib/api/ficha-paciente/plano-tratamento/planosTratamentoList";
import { useQuery } from "@tanstack/react-query";


export function usePlanosTratamento({ 
  pacienteId, 
  enabled = true 
}: { 
  pacienteId: number; 
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: ["planos-tratamento", pacienteId],
    queryFn: () => ListPlanosTratamento({ pacienteId }),
    enabled: enabled && !!pacienteId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
