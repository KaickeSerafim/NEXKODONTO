"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAgendamentoSchema, CreateAgendamento } from "@/app/schemas/agendamento/agendamento";
import { useCreateAgendamento } from "@/hooks/agendamento/useCreateAgendamento";
import { useToast } from "@/hooks/user/use-toast";
import { Procedimento } from "@/app/schemas/procedimento/procedimento";
import { Paciente } from "@/app/schemas/paciente/paciente";

import { Plus, Calendar, Clock, User, Briefcase, FileText, DollarSign, Loader2, Timer } from "lucide-react";
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

  const form = useForm<CreateAgendamento>({
    resolver: zodResolver(createAgendamentoSchema),
    defaultValues: {
      valor: 0,
      duracao_estimada: 30,
      observacoes: "",
    },
  });

  const onSubmit = (data: CreateAgendamento) => {
    // Garantir que temos paciente_id e data_hora
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
        description: "Por favor, preencha a data e o horário.",
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
      // Se o valor estiver zerado, coloca o preço do procedimento
      const currentValor = form.getValues("valor");
      if (!currentValor || currentValor === 0) {
        form.setValue("valor", Number(procedimento.preco_base));
      }

      // Se a duração estiver no padrão, coloca a duração do procedimento
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] border-none shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden p-0">
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

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-3 gap-4 items-end">
                <div className="space-y-2 col-span-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Paciente
                  </Label>
                  <InputSearchPaciente onSelect={handlePacienteSelect} />
                </div>
                <div className="col-span-1">
                  <ButtonAddPaciente />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-end">
                <div className="space-y-2 col-span-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    Procedimento (Opcional)
                  </Label>
                  <InputSearchProcedimento onSelect={handleProcedimentoSelect} />
                </div>
                <div className="col-span-1">
                  <ButtonAddProcedimento />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2 col-span-1">
                <Label htmlFor="data" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Data
                </Label>
                <Input
                  id="data"
                  type="date"
                  onChange={(e) => {
                    const timePart = form.getValues("data_hora")?.split("T")[1] || "00:00:00Z";
                    form.setValue("data_hora", `${e.target.value}T${timePart}`);
                  }}
                  className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg"
                />
              </div>

              <div className="space-y-2 col-span-1">
                <Label htmlFor="hora" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Horário
                </Label>
                <Input
                  id="hora"
                  type="time"
                  className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg"
                  onChange={(e) => {
                    const dataVal = form.getValues("data_hora");
                    const datePart = dataVal ? dataVal.split("T")[0] : new Date().toISOString().split("T")[0];
                    form.setValue("data_hora", `${datePart}T${e.target.value}:00Z`);
                  }}
                />
              </div>

              <div className="space-y-2 col-span-1">
                <Label htmlFor="valor" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" />
                  Valor
                </Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  {...form.register("valor", { valueAsNumber: true })}
                  className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg font-bold text-primary"
                />
              </div>

              <div className="space-y-2 col-span-1">
                <Label htmlFor="duracao" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                  <Timer className="w-3.5 h-3.5" />
                  Duração (min)
                </Label>
                <Input
                  id="duracao"
                  type="number"
                  {...form.register("duracao_estimada", { valueAsNumber: true })}
                  className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg font-bold text-blue-600"
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
                {...form.register("observacoes")}
                placeholder="Alguma recomendação ou observação importante"
                className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg"
              />
            </div>
          </div>

          <DialogFooter className="px-6 py-6 border-t bg-gray-50/50 gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all h-11 px-6 rounded-lg"
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all h-11 px-8 rounded-lg flex items-center gap-2"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {isPending ? "Salvando..." : "Salvar Agendamento"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
