import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentosDelete } from "@/lib/api/documents/documentosDelete";
import { toast } from "sonner";

export function useDocumentosDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DocumentosDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listDocumentos"] });
      toast.success("Documento excluído com sucesso");
    },
    onError: () => {
      toast.error("Erro ao excluir documento");
    },
  });
}
