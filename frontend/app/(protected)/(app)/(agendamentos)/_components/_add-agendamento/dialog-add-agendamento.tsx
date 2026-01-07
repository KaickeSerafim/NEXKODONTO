"use client";

import React from "react";
import { Plus, Calendar, Clock, User, Briefcase, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DialogAddAgendamentoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogAddAgendamento({
  open,
  onOpenChange,
}: DialogAddAgendamentoProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] border-none shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden p-0">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-500 to-primary/80" />
        
        <DialogHeader className="px-6 pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
                Novo Agendamento
              </DialogTitle>
              <DialogDescription className="text-gray-500 font-medium">
                Preencha as informações para agendar um novo atendimento.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paciente" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Paciente
              </Label>
              <Select>
                <SelectTrigger id="paciente" className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg">
                  <SelectValue placeholder="Selecione o paciente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">João Silva</SelectItem>
                  <SelectItem value="2">Maria Oliveira</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="procedimento" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Procedimento
              </Label>
              <Select>
                <SelectTrigger id="procedimento" className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg">
                  <SelectValue placeholder="Selecione o procedimento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Limpeza</SelectItem>
                  <SelectItem value="2">Canal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Data
              </Label>
              <Input
                id="data"
                type="date"
                className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hora" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Horário
              </Label>
              <Input
                id="hora"
                type="time"
                className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Observações (Opcional)
            </Label>
            <Input
              id="observacoes"
              placeholder="Alguma recomendação ou observação importante"
              className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg"
            />
          </div>
        </div>

        <DialogFooter className="px-6 py-6 border-t bg-gray-50/50 gap-3">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all h-11 px-6 rounded-lg"
          >
            Cancelar
          </Button>
          <Button className="font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all h-11 px-8 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Salvar Agendamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
