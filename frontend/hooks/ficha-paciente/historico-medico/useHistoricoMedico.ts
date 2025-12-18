import { GetHistoricoMedico } from "@/lib/api/ficha-paciente/historico-medico/historicoMedicoGet";
import { useQuery } from "@tanstack/react-query";


export function useHistoricoMedico({ 
  pacienteId, 
  enabled = true 
}: { 
  pacienteId: number; 
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: ["historico-medico", pacienteId],
    queryFn: () => GetHistoricoMedico({ pacienteId }),
    enabled: enabled && !!pacienteId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
