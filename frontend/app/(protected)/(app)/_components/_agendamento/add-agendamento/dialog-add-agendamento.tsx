"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAgendamentoSchema, CreateAgendamento } from "@/app/schemas/agendamento/agendamento";
import { useCreateAgendamento } from "@/hooks/agendamento/useCreateAgendamento";
import { Procedimento } from "@/app/schemas/procedimento/procedimento";
import { Paciente } from "@/app/schemas/paciente/paciente";

import { Plus, Calendar, Clock, User, Briefcase, FileText, DollarSign, Loader2, Timer, CheckCircle2, Zap, CalendarCheck } from "lucide-react";
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
import { parseBackendError } from "@/lib/utils/error-parser";

import { useMemo } from "react";
import { calcularHorarioFim } from "@/app/functions/utils/formatar-data-hora";
import { sucessoCriarAgendamento, erroCriarAgendamento, campoObrigatorio } from "@/lib/toast/agendamento";
import { useDisponibilidade } from "@/hooks/agendamento/useDisponibilidade";
import GradeHorariosDisponiveis from "./grade-horarios-disponiveis";

import { atualizarDadosProcedimento } from "@/app/functions/agendamento/novo-agendamento/atualizar-dados-procedimento";
import { atualizarPacienteSelecionado } from "@/app/functions/agendamento/novo-agendamento/atualizar-paciente-selecionado";
import { atualizarHorarioConsulta, atualizarDataConsulta } from "@/app/functions/agendamento/novo-agendamento/gerenciar-data-hora";
import { buscarProximoHorarioDisponivel } from "@/app/functions/agendamento/novo-agendamento/buscar-proximo-horario";

interface DialogAddAgendamentoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogAddAgendamento({
  open,
  onOpenChange,
}: DialogAddAgendamentoProps) {
  const { mutate: createAgendamento, isPending } = useCreateAgendamento();

  const form = useForm<CreateAgendamento>({
    resolver: zodResolver(createAgendamentoSchema),
    defaultValues: {
      valor: 0,
      duracao_estimada: 0,
      observacoes: "",
      data_hora: "",
    },
  });

  // Watch apenas os campos necessários para cálculo de horário
  const dataHora = form.watch("data_hora");
  const duracao = form.watch("duracao_estimada");

  // Memorizar cálculo de horário fim para evitar recalcular em cada render
  const endTime = useMemo(() => 
    calcularHorarioFim(dataHora, duracao),
    [dataHora, duracao]
  );

  // Extrair data e hora selecionadas do data_hora para exibição
  const selectedDate = useMemo(() => {
    if (!dataHora) return "";
    return dataHora.split("T")[0] || "";
  }, [dataHora]);

  const selectedTime = useMemo(() => {
    if (!dataHora) return "";
    const timePart = dataHora.split("T")[1];
    if (!timePart) return "";
    return timePart.substring(0, 5); // HH:MM
  }, [dataHora]);

  // Hook para buscar disponibilidade
  const { data: disponibilidadeData } = useDisponibilidade(selectedDate);

  const onSubmit = (data: CreateAgendamento) => {
    if (!data.paciente_id) {
      campoObrigatorio("selecione um paciente");
      return;
    }
    if (!data.data_hora) {
      campoObrigatorio("selecione um horário");
      return;
    }

    createAgendamento(data, {
      onSuccess: () => {
        sucessoCriarAgendamento();
        form.reset();
        onOpenChange(false);
      },
      onError: (error: any) => {
        console.log("❌ Error caught in mutation:", error);
        
        // Log para debug
        if (error.response) {
            console.log("📦 Error Response:", error.response);
        }

        const errorMessage = parseBackendError(error);
        erroCriarAgendamento(errorMessage);
      },
    });
  };

  const handleProcedimentoSelect = (procedimento: Procedimento) => {
    atualizarDadosProcedimento(form, procedimento);
  };

  const handlePacienteSelect = (paciente: Paciente) => {
    atualizarPacienteSelecionado(form, paciente);
  };

  const handleTimeSelect = (time: string) => {
    atualizarHorarioConsulta(form, time, selectedDate);
  };

  const handleDateChange = (date: string) => {
    atualizarDataConsulta(form, date, selectedTime);
  };

  // Selecionar data de hoje
  const handleSelectToday = () => {
    const today = new Date().toISOString().split("T")[0];
    handleDateChange(today);
  };

  // Selecionar próximo horário disponível
  const handleSelectNextAvailable = () => {
    buscarProximoHorarioDisponivel(form, disponibilidadeData, selectedDate);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] border-none shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden p-0 flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-500 to-primary/80 z-50" />
        
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

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 custom-scrollbar">
            {/* Paciente - Linha completa */}
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

            {/* Procedimento - Linha completa */}
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

            {/* Valor e Duração - Mesma linha */}
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

            {/* Data da Consulta - Linha completa */}
            <div className="space-y-3 p-5 rounded-2xl bg-gray-50/50 border border-gray-100">
              <div className="flex items-center justify-between">
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
              
              <div className="flex gap-2">
                <Input
                  id="data"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="flex-1 h-11 bg-white border-gray-100 focus:ring-primary/20 transition-all rounded-xl font-bold"
                />
                <Button
                  type="button"
                  onClick={handleSelectToday}
                  variant="outline"
                  className="h-11 px-4 rounded-xl font-bold text-primary border-primary/20 hover:bg-primary/5 flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Hoje
                </Button>
              </div>

              {selectedDate && (
                <>
                  <div className="pt-2">
                    <GradeHorariosDisponiveis
                      date={selectedDate} 
                      onSelect={handleTimeSelect}
                      selectedTime={selectedTime}
                    />
                  </div>

                  {disponibilidadeData?.slots.some(s => s.disponivel && s.status === "disponivel") && (
                    <Button
                      type="button"
                      onClick={handleSelectNextAvailable}
                      variant="outline"
                      className="w-full h-11 rounded-xl font-bold text-primary border-primary/20 hover:bg-primary/5 flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Selecionar Próximo Disponível
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Observações - Linha completa */}
            <div className="space-y-2">
              <Label htmlFor="observacoes" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Observações
              </Label>
              <textarea
                id="observacoes"
                {...form.register("observacoes")}
                className="w-full min-h-[80px] p-3 text-sm bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-xl outline-none resize-none"
                placeholder="Observações clínicas ou recomendações..."
              />
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
