"use client";

import React, { useState } from "react";

import { XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useDesmarcarAgendamentos } from "@/hooks/agendamento/useDesmarcarAgendamentos";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ButtonCancelarMultiplosAgendamentosProps {
  agendamentoIds: number[];
  onSuccess?: () => void;
}

export default function ButtonCancelarMultiplosAgendamentos({
  agendamentoIds,
  onSuccess,
}: ButtonCancelarMultiplosAgendamentosProps) {
  const [open, setOpen] = useState(false);
  const { mutate: desmarcarAgendamentos, isPending } = useDesmarcarAgendamentos();

  const handleCancel = () => {
    // Se for apenas um agendamento, usa agendamento_id, senão usa agendamento_ids
    const payload = agendamentoIds.length === 1
      ? { agendamento_id: agendamentoIds[0] }
      : { agendamento_ids: agendamentoIds };

    desmarcarAgendamentos(payload, {
      onSuccess: (data) => {
        const { total_processados, total_erros, erros } = data.data;

        if (total_processados > 0 && total_erros === 0) {
          // Todos foram processados com sucesso
          toast.success(
            `${total_processados} agendamento(s) desmarcado(s) com sucesso!`
          );
        } else if (total_processados > 0 && total_erros > 0) {
          // Sucesso parcial
          toast.warning(
            `${total_processados} agendamento(s) desmarcado(s). ${total_erros} erro(s) encontrado(s).`,
            {
              description: erros.map(e => `ID ${e.agendamento_id}: ${e.erro}`).join(", "),
            }
          );
        } else {
          // Todos falharam
          toast.error("Nenhum agendamento foi desmarcado", {
            description: erros.map(e => `ID ${e.agendamento_id}: ${e.erro}`).join(", "),
          });
        }

        setOpen(false);
        onSuccess?.();
      },
      onError: (error) => {
        toast.error("Erro ao desmarcar agendamento(s)", {
          description: error.message,
        });
        console.error(error);
      },
    });
  };

  const getDialogTitle = () => {
    if (agendamentoIds.length === 1) {
      return "Desmarcar Agendamento";
    }
    return `Desmarcar ${agendamentoIds.length} Agendamentos`;
  };

  const getDialogDescription = () => {
    if (agendamentoIds.length === 1) {
      return "Tem certeza que deseja desmarcar este agendamento? Esta ação marcará o agendamento como cancelado.";
    }
    return `Tem certeza que deseja desmarcar todos os ${agendamentoIds.length} agendamentos do dia? Esta ação marcará todos como cancelados.`;
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-6 w-6 opacity-0 group-hover:opacity-100 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center"
        title="Desmarcar agendamentos"
      >
        <XCircle className="w-3.5 h-3.5" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              {getDialogTitle()}
            </DialogTitle>
            <DialogDescription>
              {getDialogDescription()}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Não
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
              onClick={handleCancel}
              disabled={isPending}
            >
              {isPending ? "Processando..." : "Sim, desmarcar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
