import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listarBloqueios, bloquearDia, desbloquearDia } from "@/lib/api/user/bloqueio";

export function useBloqueios() {
  return useQuery({
    queryKey: ["bloqueios"],
    queryFn: listarBloqueios,
  });
}

export function useBloquearDia() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ data, motivo, hora_inicio, hora_fim }: { data: string; motivo?: string; hora_inicio?: string | null; hora_fim?: string | null }) => 
      bloquearDia(data, motivo, hora_inicio, hora_fim),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bloqueios"] });
      // Também invalida agendamentos pois o estado visual do dia pode mudar
      queryClient.invalidateQueries({ queryKey: ["listAgendamentos"] });
    },
  });
}

export function useDesbloquearDia() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: string) => desbloquearDia(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bloqueios"] });
      queryClient.invalidateQueries({ queryKey: ["listAgendamentos"] });
    },
  });
}
