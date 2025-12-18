"use client";

import { Button } from "@/components/ui/button";
import { useDocumentosDownload } from "@/hooks/documents/useDocumentosDownload";
import { Download } from "lucide-react";



interface BotaoDonwnloadDocumentoProps {
  documentoId: number;
}

export function BotaoDonwnloadDocumento({
  documentoId,
}: BotaoDonwnloadDocumentoProps) {
  const { mutate: download } = useDocumentosDownload();

  return (
    <Button size="sm" onClick={() => download(documentoId)}>
      <Download className="w-4 h-4 text-green-500" />
    </Button>
  );
}
