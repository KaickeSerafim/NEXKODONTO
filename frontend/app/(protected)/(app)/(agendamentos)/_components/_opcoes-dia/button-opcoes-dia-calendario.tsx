"use client";

import React, { useState } from "react";
import { MoreVertical, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/utils";
import { useDesmarcarAgendamentos } from "@/hooks/agendamento/useDesmarcarAgendamentos";
import { useBloquearDia, useDesbloquearDia } from "@/hooks/user/useBloqueio";
import { 
  DialogDesmarcarAgendamentos, 
  MenuItemDesmarcar, 
  MenuItemVerCancelados,
  buildDesmarcarPayload,
  handleDesmarcarSuccess,
  handleDesmarcarError,
  type DesmarcarAgendamentosResponse
} from "./_desmarcar";
import { 
  MenuItemTravarDia, 
  DialogTravarDia,
  handleBloqueioSuccess,
  handleDesbloqueioSuccess,
  handleBloqueioError
} from "./_travar-dia";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";


interface ButtonOpcoesDiaCalendarioProps {
  agendamentos: Agendamento[];
  data: string; // YYYY-MM-DD
  isBloqueado: boolean;
  onSuccess?: () => void;
  onFilterChange?: (mode: "default" | "cancelada" | "faltou" | "concluida") => void;
  filterMode?: "default" | "cancelada" | "faltou" | "concluida";
}

export default function ButtonOpcoesDiaCalendario({
  agendamentos,
  data,
  isBloqueado,
  onSuccess,
  onFilterChange,
  filterMode = "default",
}: ButtonOpcoesDiaCalendarioProps) {
  const [openDesmarcar, setOpenDesmarcar] = useState(false);
  const [openTravar, setOpenTravar] = useState(false);
  
  const { mutate: desmarcarAgendamentos, isPending: isPendingDesmarcar } = useDesmarcarAgendamentos();
  const { mutate: bloquearDia, isPending: isPendingBloquear } = useBloquearDia();
  const { mutate: desbloquearDia, isPending: isPendingDesbloquear } = useDesbloquearDia();

  const handleDesmarcar = (idsParaDesmarcar?: number[]) => {
    const ids = idsParaDesmarcar || agendamentos.map(ag => ag.id);
    const payload = buildDesmarcarPayload(ids);

    desmarcarAgendamentos(payload, {
      onSuccess: (data: DesmarcarAgendamentosResponse) => {
        handleDesmarcarSuccess(data);
        setOpenDesmarcar(false);
        onSuccess?.();
      },
      onError: (error: any) => {
        handleDesmarcarError(error);
      },
    });
  };

  const handleToggleBloqueio = (dataBloqueio: { motivo: string, hora_inicio?: string, hora_fim?: string }) => {
    if (isBloqueado) {
      desbloquearDia(data, {
        onSuccess: () => {
          handleDesbloqueioSuccess();
          setOpenTravar(false);
          onSuccess?.();
        },
        onError: (error: any) => {
          handleBloqueioError(error, "desbloquear");
        }
      });
    } else {
      bloquearDia({ 
        data, 
        motivo: dataBloqueio.motivo, 
        hora_inicio: dataBloqueio.hora_inicio || null, 
        hora_fim: dataBloqueio.hora_fim || null 
      }, {
        onSuccess: () => {
          handleBloqueioSuccess(dataBloqueio.hora_inicio);
          setOpenTravar(false);
          onSuccess?.();
        },
        onError: (error: any) => {
          handleBloqueioError(error, "bloquear");
        }
      });
    }
  };

  return (
    <div className="flex items-center gap-1">
      {agendamentos.length > 0 && (
        <button
          onClick={() => setOpenDesmarcar(true)}
          className="h-6 w-6 opacity-0 group-hover:opacity-100 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center"
          title="Desmarcar agendamentos"
        >
          <XCircle className="w-3.5 h-3.5" />
        </button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
               "h-6 w-6 opacity-0 group-hover:opacity-100 rounded-md transition-all flex items-center justify-center",
               filterMode !== "default" ? "opacity-100 text-primary bg-primary/10" : "text-gray-400 hover:text-primary hover:bg-primary/5"
            )}
            title="Mais opções do dia"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="text-xs font-bold text-gray-500">
            Filtros de Exibição
          </DropdownMenuLabel>
          
          <DropdownMenuItem 
            className={cn("text-xs font-medium cursor-pointer", filterMode === "default" && "bg-primary/5 text-primary font-bold")}
            onSelect={() => onFilterChange?.("default")}
          >
            Padrão (Agendada/Confirmada)
          </DropdownMenuItem>

          <DropdownMenuItem 
            className={cn("text-xs font-medium cursor-pointer", filterMode === "concluida" && "bg-blue-50 text-blue-700 font-bold")}
            onSelect={() => onFilterChange?.("concluida")}
          >
            Mostrar somente Concluídas
          </DropdownMenuItem>

          <DropdownMenuItem 
            className={cn("text-xs font-medium cursor-pointer", filterMode === "faltou" && "bg-pink-50 text-pink-700 font-bold")}
            onSelect={() => onFilterChange?.("faltou")}
          >
            Mostrar somente Faltas
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className={cn("text-xs font-medium cursor-pointer", filterMode === "cancelada" && "bg-red-50 text-red-700 font-bold")}
            onSelect={() => onFilterChange?.("cancelada")}
          >
            Mostrar somente Canceladas
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          
          <DropdownMenuLabel className="text-xs font-bold text-gray-500">
            Ações do Dia
          </DropdownMenuLabel>

          {agendamentos.length > 0 && (
            <MenuItemDesmarcar
              onSelect={() => setOpenDesmarcar(true)}
              quantidadeAgendamentos={agendamentos.length}
            />
          )}

          <DropdownMenuSeparator />
          
          <MenuItemTravarDia 
            isBloqueado={isBloqueado} 
            onSelect={() => setOpenTravar(true)} 
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogDesmarcarAgendamentos
        open={openDesmarcar}
        onOpenChange={setOpenDesmarcar}
        onConfirm={handleDesmarcar}
        isPending={isPendingDesmarcar}
        agendamentos={agendamentos}
      />

      <DialogTravarDia
        open={openTravar}
        onOpenChange={setOpenTravar}
        onConfirm={handleToggleBloqueio}
        isPending={isPendingBloquear || isPendingDesbloquear}
        isBloqueado={isBloqueado}
        temAgendamentos={agendamentos.length}
        data={data}
      />
    </div>
  );
}


