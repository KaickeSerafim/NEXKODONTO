import { useQuery } from "@tanstack/react-query";
import { getDisponibilidade } from "@/lib/api/agendamento/agendamentoDisponibilidade";

export const useDisponibilidade = (date: string, dentista_id?: number) => {
  return useQuery({
    queryKey: ["disponibilidade", date, dentista_id],
    queryFn: () => getDisponibilidade(date, dentista_id),
    enabled: !!date,
  });
};
