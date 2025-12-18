import { GetFichaPaciente } from "@/lib/api/ficha-paciente/fichaPacienteGet";
import { useQuery } from "@tanstack/react-query";


export function useFichaPaciente({ 
  pacienteId, 
  enabled = true 
}: { 
  pacienteId: number; 
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: ["ficha-paciente", pacienteId],
    queryFn: () => GetFichaPaciente({ pacienteId }),
    enabled: enabled && !!pacienteId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
