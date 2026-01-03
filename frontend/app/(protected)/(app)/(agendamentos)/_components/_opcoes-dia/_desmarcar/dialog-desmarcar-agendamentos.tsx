"use client";

import React, { useState, useEffect } from "react";
import { XCircle, CheckCircle2, Clock, User, CreditCard, MessageCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";
import { cn } from "@/lib/utils/utils";
import { Badge } from "@/components/ui/badge";

interface DialogDesmarcarAgendamentosProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (ids: number[]) => void;
  isPending: boolean;
  agendamentos: Agendamento[];
}

export function DialogDesmarcarAgendamentos({
  open,
  onOpenChange,
  onConfirm,
  isPending,
  agendamentos,
}: DialogDesmarcarAgendamentosProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (open) {
      setSelectedIds(agendamentos.map((ag) => ag.id));
    }
  }, [open, agendamentos]);

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedIds);
  };

  const isPaid = (ag: Agendamento) => {
    return ag.pagamento && ag.pagamento.some(p => p.status === 'pago');
  };

  const isConfirmed = (ag: Agendamento) => {
    return ag.status === 'confirmada';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <XCircle className="w-6 h-6 text-red-600" />
            Desmarcar Agendamentos do Dia
          </DialogTitle>
          <DialogDescription className="text-base">
            Selecione os agendamentos que deseja desmarcar. Agendamentos pagos e confirmados serão sinalizados para remarcação.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-3 px-1">
          {agendamentos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <AlertCircle className="w-12 h-12 mb-2 opacity-20" />
              <p>Nenhum agendamento ativo para este dia.</p>
            </div>
          ) : (
            agendamentos.map((ag) => {
              const paid = isPaid(ag);
              const confirmed = isConfirmed(ag);
              const selected = selectedIds.includes(ag.id);

              return (
                <div
                  key={ag.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group",
                    selected 
                      ? "bg-red-50/50 border-red-200 shadow-sm" 
                      : "bg-white border-gray-100 hover:border-gray-200 grayscale opacity-60",
                    (paid && confirmed) && selected && "ring-2 ring-primary/20 bg-primary/[0.02] border-primary/30"
                  )}
                  onClick={() => toggleSelection(ag.id)}
                >
                  <Checkbox
                    checked={selected}
                    onCheckedChange={() => toggleSelection(ag.id)}
                    className={cn(
                      "h-5 w-5",
                      selected ? "data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600" : ""
                    )}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-gray-900">
                          { ag.data_hora ? ag.data_hora.substring(11, 16) : ""}
                        </span>
                        <h4 className="text-sm font-bold text-gray-700 truncate">
                          {ag.paciente_detail.nome}
                        </h4>
                      </div>
                      <div className="flex gap-1">
                        {paid && (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold py-0 h-5">
                            <CreditCard className="w-3 h-3 mr-1" />
                            PAGO
                          </Badge>
                        )}
                        {confirmed && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] font-bold py-0 h-5">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            CONFIRMADO
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {ag.procedimento_detail.nome}
                      </span>
                    </div>

                    {paid && confirmed && selected && (
                      <div className="mt-2 flex items-center gap-2 text-[11px] font-bold text-primary animate-pulse">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Notificar paciente para remarcação prioritária</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="flex-1 sm:flex-none"
          >
            Voltar
          </Button>
          <Button
            className={cn(
              "flex-1 sm:flex-none font-bold",
              selectedIds.length > 0 ? "bg-red-600 hover:bg-red-700" : "bg-gray-400"
            )}
            onClick={handleConfirm}
            disabled={isPending || selectedIds.length === 0}
          >
            {isPending ? "Processando..." : `Desmarcar ${selectedIds.length} Selecionado(s)`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
