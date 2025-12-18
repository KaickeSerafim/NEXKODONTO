"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDocumentosDelete } from "@/hooks/documents/useDocumentosDelete";

interface BotaoExcluirDocumentoProps {
  documentoId: number;
}

export function BotaoExcluirDocumento({ documentoId }: BotaoExcluirDocumentoProps) {
  const { mutate: deleteDoc } = useDocumentosDelete();

  return (
    <Button size="sm"  onClick={() => deleteDoc(documentoId)}>
      <Trash2 className="w-4 h-4 text-red-500" />
    </Button>
  );
}
