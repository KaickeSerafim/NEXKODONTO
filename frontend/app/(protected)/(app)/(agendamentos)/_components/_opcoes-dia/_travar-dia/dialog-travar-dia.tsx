"use client";

import React from "react";
import { Lock, Unlock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { travarDiaFormSchema, TravarDiaFormValues } from "@/app/schemas/bloqueio/travar-dia-form";

interface DialogTravarDiaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: { motivo: string, hora_inicio?: string, hora_fim?: string }) => void;
  isPending: boolean;
  isBloqueado: boolean;
  temAgendamentos: number;
  data: string;
}

export function DialogTravarDia({
  open,
  onOpenChange,
  onConfirm,
  isPending,
  isBloqueado,
  temAgendamentos,
  data,
}: DialogTravarDiaProps) {
  const form = useForm<TravarDiaFormValues>({
    resolver: zodResolver(travarDiaFormSchema),
    defaultValues: {
      motivo: "",
      tipo_bloqueio: "dia_todo",
      hora_inicio: "08:00",
      hora_fim: "18:00",
    }
  });

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = form;
  const tipoBloqueio = watch("tipo_bloqueio");

  const onSubmit = (values: TravarDiaFormValues) => {
    if (values.tipo_bloqueio === "dia_todo") {
      onConfirm({ motivo: values.motivo || "" });
    } else {
      onConfirm({ 
        motivo: values.motivo || "", 
        hora_inicio: values.hora_inicio, 
        hora_fim: values.hora_fim 
      });
    }
    reset();
  };

  const formattedDate = new Date(data + "T00:00:00").toLocaleDateString('pt-BR');

  if (isBloqueado) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Unlock className="w-5 h-5 text-amber-600" />
              Gerenciar Bloqueios
            </DialogTitle>
            <DialogDescription>
              Este dia possui bloqueios ativos. Deseja remover todos os bloqueios para o dia {formattedDate}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancelar
            </Button>
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => onConfirm({ motivo: "" })}
              disabled={isPending}
            >
              {isPending ? "Processando..." : "Sim, desbloquear dia"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black">
            <Lock className="w-6 h-6 text-primary" />
            Travar Agenda
          </DialogTitle>
          <DialogDescription className="text-sm font-medium">
            Configure o bloqueio para o dia <span className="text-primary font-bold">{formattedDate}</span>
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
          <div className="flex p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setValue("tipo_bloqueio", "dia_todo")}
              className={cn(
                "flex-1 py-2 text-xs font-bold rounded-md transition-all",
                tipoBloqueio === "dia_todo" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Dia Todo
            </button>
            <button
              type="button"
              onClick={() => setValue("tipo_bloqueio", "horario")}
              className={cn(
                "flex-1 py-2 text-xs font-bold rounded-md transition-all",
                tipoBloqueio === "horario" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Horário Específico
            </button>
          </div>

          {tipoBloqueio === "horario" && (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid gap-2">
                <Label htmlFor="hora_inicio" className="text-xs font-bold uppercase text-slate-500">Início</Label>
                <Input
                  id="hora_inicio"
                  type="time"
                  {...register("hora_inicio")}
                  className={cn("font-bold", errors.hora_inicio && "border-red-500")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hora_fim" className="text-xs font-bold uppercase text-slate-500">Fim</Label>
                <Input
                  id="hora_fim"
                  type="time"
                  {...register("hora_fim")}
                  className={cn("font-bold", errors.hora_fim && "border-red-500")}
                />
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="motivo" className="text-xs font-bold uppercase text-slate-500">Motivo (Opcional)</Label>
            <Input
              id="motivo"
              placeholder="Ex: Feriado, Recesso, Particular..."
              {...register("motivo")}
              disabled={isPending}
              className="bg-slate-50 border-slate-200"
            />
          </div>

          {temAgendamentos > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-amber-900 font-bold mb-0.5">Agendamentos Existentes</p>
                <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                  Este dia já possui {temAgendamentos} agendamento(s). Eles permanecerão na agenda.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending} className="font-bold">
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-black px-8"
              disabled={isPending}
            >
              {isPending ? "Processando..." : "Confirmar Bloqueio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
