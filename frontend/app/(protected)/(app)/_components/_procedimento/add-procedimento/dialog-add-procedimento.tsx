"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Briefcase, Clock, DollarSign, Loader2 } from "lucide-react";
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
import { CreateProcedimentoSchema, CreateProcedimentoData } from "@/app/schemas/procedimento/createProcedimento";
import { useCreateProcedimento } from "@/hooks/procedimento/useCreateProcedimento";
import { cn } from "@/lib/utils/utils";

interface DialogAddProcedimentoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DialogAddProcedimento({
  open,
  onOpenChange,
}: DialogAddProcedimentoProps) {
  const { mutate: createProcedimento, isPending } = useCreateProcedimento();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProcedimentoData>({
    resolver: zodResolver(CreateProcedimentoSchema),
    defaultValues: {
        duracao_minutos: 30,
    }
  });

  const onSubmit = (data: CreateProcedimentoData) => {
    createProcedimento(data, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
        if (!isPending) {
            onOpenChange(val);
            if (!val) reset();
        }
    }}>
      <DialogContent className="sm:max-w-[450px] border-none shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden p-0">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-500 to-primary/80" />
        
        <DialogHeader className="px-6 pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
                Novo Procedimento
              </DialogTitle>
              <DialogDescription className="text-gray-500 font-medium">
                Cadastre um novo procedimento e seus valores.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-6">
            {/* Nome do Procedimento */}
            <div className="space-y-2">
              <Label htmlFor="nome" className={"text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 " + (errors.nome ? "text-red-500" : "text-gray-500")}>
                <Briefcase className="w-3.5 h-3.5" />
                Nome do Procedimento *
              </Label>
              <Input
                id="nome"
                placeholder="Ex: Consulta Inicial"
                className={cn(
                    "h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg",
                    errors.nome && "border-red-200 bg-red-50/30"
                )}
                {...register("nome")}
              />
              {errors.nome && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.nome.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Duração */}
              <div className="space-y-2">
                <Label htmlFor="duracao_minutos" className={"text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 " + (errors.duracao_minutos ? "text-red-500" : "text-gray-500")}>
                  <Clock className="w-3.5 h-3.5" />
                  Duração (min) *
                </Label>
                <Input
                  id="duracao_minutos"
                  type="number"
                  placeholder="30"
                  className={cn(
                    "h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg",
                    errors.duracao_minutos && "border-red-200 bg-red-50/30"
                  )}
                  {...register("duracao_minutos")}
                />
                {errors.duracao_minutos && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.duracao_minutos.message}</span>}
              </div>

              {/* Preço Base */}
              <div className="space-y-2">
                <Label htmlFor="preco_base" className={"text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 " + (errors.preco_base ? "text-red-500" : "text-gray-500")}>
                  <DollarSign className="w-3.5 h-3.5" />
                  Preço Base *
                </Label>
                <Input
                  id="preco_base"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  className={cn(
                    "h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg",
                    errors.preco_base && "border-red-200 bg-red-50/30"
                  )}
                  {...register("preco_base")}
                />
                {errors.preco_base && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.preco_base.message}</span>}
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-6 border-t bg-gray-50/50 gap-3">
            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
              className="font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all h-11 px-6 rounded-lg"
            >
              Cancelar
            </Button>
            <Button 
                type="submit"
                disabled={isPending}
                className="font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all h-11 px-8 rounded-lg flex items-center gap-2"
            >
                {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Plus className="w-4 h-4" />
                )}
                Cadastrar Procedimento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
