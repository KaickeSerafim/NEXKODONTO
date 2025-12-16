import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentosUpdate } from "@/lib/api/documents/documentosUpdate";
import { toast } from "sonner";

export function useDocumentosUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DocumentosUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listDocumentos"] });
      toast.success("Documento atualizado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao atualizar documento");
    },
  });
}
