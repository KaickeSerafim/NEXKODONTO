"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Agendamento } from "@/app/schemas/agendamento/agendamento";
import { ArquivosPaciente } from "./arquivos-paciente";
import { ArquivosAgendamento } from "./arquivos-agendamento";

interface ArquivosDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agendamento: Agendamento;
}

export function ArquivosDialog({ open, onOpenChange, agendamento }: ArquivosDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="p-3">
            Arquivos - <span className="border-b border-b-slate-900 rounded-sm">{agendamento.paciente_detail.nome}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="paciente" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="agendamento">
              Arquivos do Agendamento
            </TabsTrigger>
            <TabsTrigger value="paciente">Arquivos do Paciente</TabsTrigger>
          </TabsList>

          <TabsContent value="paciente" className="mt-4">
            <ArquivosPaciente pacienteId={agendamento.paciente_detail.id} />
          </TabsContent>

          <TabsContent value="agendamento" className="mt-4">
            <ArquivosAgendamento agendamentoId={agendamento.id} pacienteId={agendamento.paciente_detail.id} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
