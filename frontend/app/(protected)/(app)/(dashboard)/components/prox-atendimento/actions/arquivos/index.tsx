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
          <DialogTitle>Arquivos - {agendamento.paciente_detail.nome}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="paciente" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="paciente">Arquivos do Paciente</TabsTrigger>
            <TabsTrigger value="agendamento">Arquivos do Agendamento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="paciente" className="mt-4">
            <ArquivosPaciente />
          </TabsContent>
          
          <TabsContent value="agendamento" className="mt-4">
            <ArquivosAgendamento />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
