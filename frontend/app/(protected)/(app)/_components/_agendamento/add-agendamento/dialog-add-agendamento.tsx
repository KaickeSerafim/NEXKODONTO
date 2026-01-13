"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAgendamentoSchema, CreateAgendamento } from "@/app/schemas/agendamento/agendamento";
import { useCreateAgendamento } from "@/hooks/agendamento/useCreateAgendamento";
import { useToast } from "@/hooks/user/use-toast";
import { Procedimento } from "@/app/schemas/procedimento/procedimento";
import { Paciente } from "@/app/schemas/paciente/paciente";

import { Plus, Calendar, Clock, User, Briefcase, FileText, DollarSign, Loader2, Timer, CheckCircle2 } from "lucide-react";
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
import InputSearchPaciente from "../../_paciente/input-search-pacientes";
import InputSearchProcedimento from "../../_procedimento/input-search-procedimento";
import ButtonAddPaciente from "../../_paciente/add-paciente";
import ButtonAddProcedimento from "../../_procedimento/add-procedimento";
import SearchHorario from "./search-horario";
import { useState } from "react";
import { calcularHorarioFim } from "@/app/functions/utils/formatar-data-hora";

interface DialogAddAgendamentoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogAddAgendamento({
  open,
  onOpenChange,
}: DialogAddAgendamentoProps) {
  const { toast } = useToast();
  const { mutate: createAgendamento, isPending } = useCreateAgendamento();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const form = useForm<CreateAgendamento>({
    resolver: zodResolver(createAgendamentoSchema),
    defaultValues: {
      valor: 0,
      duracao_estimada: 30,
      observacoes: "",
    },
  });

  const duracao = form.watch("duracao_estimada");
  const dataHora = form.watch("data_hora");

  // Calcular horário de término usando utilitário
  const endTime = calcularHorarioFim(dataHora, duracao);

  const onSubmit = (data: CreateAgendamento) => {
    if (!data.paciente_id) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, selecione um paciente.",
        variant: "destructive",
      });
      return;
    }

    if (!data.data_hora) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, selecione um horário.",
        variant: "destructive",
      });
      return;
    }

    createAgendamento(data, {
      onSuccess: () => {
        toast({
          title: "Agendamento criado!",
          description: "O agendamento foi realizado com sucesso.",
        });
        form.reset();
        setSelectedDate("");
        setSelectedTime("");
        onOpenChange(false);
      },
      onError: (error: any) => {
        toast({
          title: "Erro ao criar agendamento",
          description: error.message || "Ocorreu um erro inesperado.",
          variant: "destructive",
        });
      },
    });
  };

  const handleProcedimentoSelect = (procedimento: Procedimento) => {
    if (procedimento.id) {
      form.setValue("procedimento_id", procedimento.id);
      const currentValor = form.getValues("valor");
      if (!currentValor || currentValor === 0) {
        form.setValue("valor", Number(procedimento.preco_base));
      }

      const currentDuracao = form.getValues("duracao_estimada");
      if (!currentDuracao || currentDuracao === 30) {
        form.setValue("duracao_estimada", Number(procedimento.duracao_minutos));
      }
    } else {
      form.setValue("procedimento_id", null);
      form.setValue("valor", 0);
      form.setValue("duracao_estimada", 30);
    }
  };

  const handlePacienteSelect = (paciente: Paciente) => {
    if (paciente.id) {
      form.setValue("paciente_id", paciente.id);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      form.setValue("data_hora", `${selectedDate}T${time}:00Z`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[850px] border-none shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden p-0">
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
                Reserve um horário para o procedimento.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Lado Esquerdo: Paciente e Procedimento */}
            <div className="md:col-span-5 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Paciente
                  </Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <InputSearchPaciente onSelect={handlePacienteSelect} />
                    </div>
                    <ButtonAddPaciente />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    Procedimento
                  </Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <InputSearchProcedimento onSelect={handleProcedimentoSelect} />
                    </div>
                    <ButtonAddProcedimento />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valor" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    Valor (R$)
                  </Label>
                  <Input
                    id="valor"
                    type="number"
                    step="0.01"
                    {...form.register("valor", { valueAsNumber: true })}
                    className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-xl font-bold text-emerald-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duracao" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <Timer className="w-3.5 h-3.5" />
                    Duração (min)
                  </Label>
                  <Input
                    id="duracao"
                    type="number"
                    {...form.register("duracao_estimada", { valueAsNumber: true })}
                    className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-xl font-bold text-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Observações
                </Label>
                <textarea
                  id="observacoes"
                  {...form.register("observacoes")}
                  className="w-full min-h-[100px] p-3 text-sm bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-xl outline-none"
                  placeholder="Observações clínicas ou recomendações..."
                />
              </div>
            </div>

            {/* Lado Direito: Data e Horário */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="data" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Data da Consulta
                  </Label>
                  {selectedTime && endTime && (
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                      <Clock className="w-3 h-3" />
                      {selectedTime} às {endTime}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <Input
                    id="data"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      if (selectedTime) {
                        form.setValue("data_hora", `${e.target.value}T${selectedTime}:00Z`);
                      }
                    }}
                    className="h-12 bg-white border-gray-100 focus:ring-primary/20 transition-all rounded-xl font-bold text-lg px-4"
                  />
                </div>

                <div className="pt-2">
                  <SearchHorario 
                    date={selectedDate} 
                    onSelect={handleTimeSelect}
                    selectedTime={selectedTime}
                  />
                </div>
              </div>

              {selectedTime && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    Horário das <span className="font-bold">{selectedTime}</span> selecionado com sucesso.
                  </p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="px-6 py-6 border-t bg-gray-50/50 gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all h-11 px-6 rounded-xl"
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all h-11 px-8 rounded-xl flex items-center gap-2"
              disabled={isPending || !selectedTime}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {isPending ? "Agendando..." : "Finalizar Agendamento"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
