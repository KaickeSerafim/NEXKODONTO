import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/lib/api/dashboard/dashboardStats";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    retry: false,
    staleTime: 2 * 60 * 1000, // 2 minutos - dados podem estar um pouco desatualizados sem problemas
    refetchOnWindowFocus: true, // Atualiza quando o usuário volta para a aba
  });
}
