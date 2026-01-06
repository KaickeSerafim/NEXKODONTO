"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";
import FichaPaciente from "./index";

interface FichaPacienteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agendamento: Agendamento;
}

export function FichaPacienteDialog({ 
  open, 
  onOpenChange, 
  agendamento 
}: FichaPacienteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="p-3">
            Ficha do Paciente - <span className="border-b border-b-slate-900 rounded-sm">{agendamento.paciente_detail?.nome}</span>
          </DialogTitle>
        </DialogHeader>

        <FichaPaciente 
          pacienteId={agendamento.paciente_detail?.id || 0}
      
        />
      </DialogContent>
    </Dialog>
  );
}