import { DocumentosPacienteList } from "@/lib/api/documents/documentosList";
import { useQuery } from "@tanstack/react-query";

interface UseListDocumentosParams {
  tipo?: string;
  paciente?: number;
  agendamento?: number;
  data_inicio?: string;
  data_fim?: string;
}

export function useListDocumentos(params?: UseListDocumentosParams) {
  return useQuery({
    queryKey: ["listDocumentos", params],
    queryFn: () => DocumentosPacienteList(params),
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
