import { useQuery } from "@tanstack/react-query";
import { GetPacientes } from "@/lib/api/paciente/pacientesList";

export function usePacientes(search?: string, limit: number = 10, offset: number = 0) {
  return useQuery({
    queryKey: ["pacientes", { search, limit, offset }],
    queryFn: () => GetPacientes({ search, limit, offset }),
  });
}
