"use client";

import React from "react";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface DialogDesmarcarAgendamentosProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
  quantidadeAgendamentos: number;
}

export function DialogDesmarcarAgendamentos({
  open,
  onOpenChange,
  onConfirm,
  isPending,
  quantidadeAgendamentos,
}: DialogDesmarcarAgendamentosProps) {
  const getTitle = () => {
    if (quantidadeAgendamentos === 1) {
      return "Desmarcar Agendamento";
    }
    return `Desmarcar ${quantidadeAgendamentos} Agendamentos`;
  };

  const getDescription = () => {
    if (quantidadeAgendamentos === 1) {
      return "Tem certeza que deseja desmarcar este agendamento? Esta ação marcará o agendamento como cancelado.";
    }
    return `Tem certeza que deseja desmarcar todos os ${quantidadeAgendamentos} agendamentos do dia? Esta ação marcará todos como cancelados.`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            {getTitle()}
          </DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Não
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white font-bold"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "Processando..." : "Sim, desmarcar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
