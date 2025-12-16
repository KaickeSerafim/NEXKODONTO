import { useMutation } from "@tanstack/react-query";
import { DocumentosDownload } from "@/lib/api/documents/documentosDownload";
import { toast } from "sonner";

export function useDocumentosDownload() {
  return useMutation({
    mutationFn: DocumentosDownload,
    onSuccess: (blob, id) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `documento-${id}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    onError: () => {
      toast.error("Erro ao baixar arquivo");
    },
  });
}
