import { useQuery } from "@tanstack/react-query";
import { GetProcedimentos } from "@/lib/api/procedimento/procedimentoList";

export function useProcedimentos(nome?: string, limit: number = 20, offset: number = 0) {
  return useQuery({
    queryKey: ["procedimentos", { nome, limit, offset }],
    queryFn: () => GetProcedimentos({ nome, limit, offset }),
  });
}
