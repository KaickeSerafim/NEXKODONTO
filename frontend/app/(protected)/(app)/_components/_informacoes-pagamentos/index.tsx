"use client";

import { Button } from "@/components/ui/button";
import Loading from "@/components/loading/Loading";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePagamentosPorAgendamento } from "@/hooks/pagamento/usePagamentosPorAgendamento";
import { usePagamentosPorPaciente } from "@/hooks/pagamento/usePagamentosPorPaciente";
import { useMemo } from "react";
import { PagamentoDestaque } from "./PagamentoDestaque";
import { HistoricoPagamentos } from "./HistoricoPagamentos";

interface InformacoesPagamentosProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agendamentoId?: number | string;
  pacienteId?: number | string;
}

export default function InformacoesPagamento({
  open,
  onOpenChange,
  agendamentoId,
  pacienteId,
}: InformacoesPagamentosProps) {
  // Buscar pagamentos do agendamento
  const { data: agendamentoResponse, isLoading: loadingAgendamento, error: errorAgendamento } = usePagamentosPorAgendamento({ 
    agendamentoId: agendamentoId || 0, 
    enabled: open && !!agendamentoId 
  });

  // Buscar pagamentos do paciente
  const { data: pacienteResponse, isLoading: loadingPaciente, error: errorPaciente } = usePagamentosPorPaciente({ 
    pacienteId: pacienteId || 0, 
    enabled: open && !!pacienteId 
  });

  const isLoading = loadingAgendamento || loadingPaciente;

  // Separar pagamento do agendamento e histórico do paciente
  const { pagamentoAgendamento, historicoOutrosPagamentos } = useMemo(() => {
    const pagamentosAgendamento = agendamentoResponse?.data || [];
    const pagamentosPaciente = pacienteResponse?.data || [];

    // Primeiro pagamento do agendamento (se houver)
    const pagamentoAgendamento = pagamentosAgendamento[0] || null;

    // Filtrar histórico: todos os pagamentos do paciente EXCETO o do agendamento atual
    const historicoOutrosPagamentos = pagamentosPaciente.filter(
      (p) => p.agendamento !== agendamentoId
    );

    return { pagamentoAgendamento, historicoOutrosPagamentos };
  }, [agendamentoResponse, pacienteResponse, agendamentoId]);

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="space-y-4 py-8">
            <Loading />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const hasAnyPayment = pagamentoAgendamento || historicoOutrosPagamentos.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Informações de Pagamentos</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Pagamento do Agendamento Atual */}
          <PagamentoDestaque pagamento={pagamentoAgendamento} />

          {/* Histórico de Outros Pagamentos do Paciente */}
          <HistoricoPagamentos pagamentos={historicoOutrosPagamentos} />

          {/* Mensagem quando não há nenhum pagamento */}
          {!hasAnyPayment && (
            <div className="py-8 text-center text-muted-foreground">
              <p>Nenhum pagamento encontrado</p>
            </div>
          )}

          {/* Botão de Fechar */}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
