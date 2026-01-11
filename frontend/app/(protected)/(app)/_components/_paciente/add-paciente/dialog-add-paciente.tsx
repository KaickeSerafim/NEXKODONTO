"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, User, Phone, Mail, Calendar, MapPin, FileText, Loader2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { CreatePacienteSchema, CreatePacienteData } from "@/app/schemas/paciente/createPaciente";
import { useCreatePaciente } from "@/hooks/paciente/useCreatePaciente";
import { cn } from "@/lib/utils/utils";

interface DialogAddPacienteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DialogAddPaciente({
  open,
  onOpenChange,
}: DialogAddPacienteProps) {
  const { mutate: createPaciente, isPending } = useCreatePaciente();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePacienteData>({
    resolver: zodResolver(CreatePacienteSchema),
  });

  const onSubmit = (data: CreatePacienteData) => {
    createPaciente(data, {
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
      <DialogContent className="sm:max-w-[600px] border-none shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden p-0 max-h-[90vh] overflow-y-auto">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-500 to-primary/80" />
        
        <DialogHeader className="px-6 pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <User className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
                Novo Paciente
              </DialogTitle>
              <DialogDescription className="text-gray-500 font-medium">
                Cadastre um novo paciente no sistema.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-6">
            {/* Nome Completo */}
            <div className="space-y-2">
              <Label htmlFor="nome" className={"text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 " + (errors.nome ? "text-red-500" : "text-gray-500")}>
                <User className="w-3.5 h-3.5" />
                Nome Completo *
              </Label>
              <Input
                id="nome"
                placeholder="Ex: João da Silva"
                className={cn(
                    "h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg",
                    errors.nome && "border-red-200 bg-red-50/30"
                )}
                {...register("nome")}
              />
              {errors.nome && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.nome.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* CPF */}
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                
                  CPF
                </Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg"
                  {...register("cpf")}
                />
              </div>

              {/* Data Nascimento */}
              <div className="space-y-2">
                <Label htmlFor="data_nascimento" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Data de Nascimento
                </Label>
                <Input
                  id="data_nascimento"
                  type="date"
                  className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg"
                  {...register("data_nascimento")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  placeholder="(11) 99999-9999"
                  className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg"
                  {...register("telefone")}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className={"text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 " + (errors.email ? "text-red-500" : "text-gray-500")}>
                  <Mail className="w-3.5 h-3.5" />
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="paciente@exemplo.com"
                  className={cn(
                    "h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg",
                    errors.email && "border-red-200 bg-red-50/30"
                  )}
                  {...register("email")}
                />
                {errors.email && <span className="text-[10px] text-red-500 font-bold uppercase">{errors.email.message}</span>}
              </div>
            </div>

            {/* Endereço */}
            <div className="space-y-2">
              <Label htmlFor="endereco" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Endereço
              </Label>
              <Input
                id="endereco"
                placeholder="Rua, número, bairro"
                className="h-11 bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg"
                {...register("endereco")}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="cidade" className="text-xs font-bold uppercase tracking-wider text-gray-500">Cidade</Label>
                    <Input id="cidade" className="h-11 bg-gray-50/50 border-gray-100 rounded-lg" {...register("cidade")} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="estado" className="text-xs font-bold uppercase tracking-wider text-gray-500">Estado</Label>
                    <Input id="estado" className="h-11 bg-gray-50/50 border-gray-100 rounded-lg" {...register("estado")} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cep" className="text-xs font-bold uppercase tracking-wider text-gray-500">CEP</Label>
                    <Input id="cep" className="h-11 bg-gray-50/50 border-gray-100 rounded-lg" {...register("cep")} />
                </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label htmlFor="observacoes" className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Observações
              </Label>
              <Textarea
                id="observacoes"
                placeholder="Alergias, convênio, histórico..."
                className="min-h-[80px] bg-gray-50/50 border-gray-100 focus:ring-primary/20 transition-all rounded-lg"
                {...register("observacoes")}
              />
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
                Cadastrar Paciente
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}