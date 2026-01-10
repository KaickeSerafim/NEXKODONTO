import { useQuery } from "@tanstack/react-query";
import { GetPacientes } from "@/lib/api/paciente/pacientesList";

export function usePacientes(nome?: string, limit: number = 10, offset: number = 0) {
  return useQuery({
    queryKey: ["pacientes", { nome, limit, offset }],
    queryFn: () => GetPacientes({ nome, limit, offset }),
  });
}
