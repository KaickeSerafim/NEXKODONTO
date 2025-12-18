"use client";


import { Label } from "@/components/ui/label";

import Loading from "@/components/loading/Loading";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface pacientePagamentos {
  id: number;
  nome: string;
  telefone: string | null;
  email: string | null;
  dentista: number;
  dataNascimento?: string;
  cpf?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  observacoes?: string;
}

interface InformacoesPagamentosProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  agendamentoPagamento?: number;
  pacientePagamentos?: pacientePagamentos;
  isLoading?: boolean;
}

export default function InformacoesPagamento({
  open,
  onOpenChange,
  pacientePagamentos,
  agendamentoPagamento,
  isLoading = false,
}: InformacoesPagamentosProps) {
  // Mock data para demonstração - substitua com dados reais da API

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Loading />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Agendamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
teste
            </div>

            <div className="space-y-2">
teste
            </div>
          </div>

          <div className="space-y-2">
teste
          </div>

          <div className="space-y-2">
teste
          </div>

          <div className="space-y-2">
teste
          </div>

          <div className="flex justify-end gap-2 pt-4">
teste
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
