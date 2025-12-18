import { ListAtendimentos } from "@/lib/api/ficha-paciente/antedimento/atendimentosList";
import { useQuery } from "@tanstack/react-query";


export function useAtendimentos({ 
  pacienteId, 
  enabled = true 
}: { 
  pacienteId: number; 
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: ["atendimentos", pacienteId],
    queryFn: () => ListAtendimentos({ pacienteId }),
    enabled: enabled && !!pacienteId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
