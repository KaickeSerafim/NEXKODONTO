import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadDocumento } from "@/lib/api/documents/documentosUpload";

export function useDocumentosUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UploadDocumento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listDocumentos"] });
    },
  });
}
