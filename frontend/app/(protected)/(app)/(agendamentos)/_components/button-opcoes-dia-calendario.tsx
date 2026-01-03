"use client";

import React, { useState } from "react";
import { MoreVertical, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "./_opcoes-dia/_desmarcar";
import { 
  MenuItemTravarDia, 
  DialogTravarDia,
  handleBloqueioSuccess,
  handleDesbloqueioSuccess,
  handleBloqueioError
} from "./_opcoes-dia/_travar-dia";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";

interface ButtonOpcoesDiaCalendarioProps {
  agendamentos: Agendamento[];
  data: string; // YYYY-MM-DD
  isBloqueado: boolean;
  onSuccess?: () => void;
  onVerCancelados?: () => void;
}

export default function ButtonOpcoesDiaCalendario({
  agendamentos,
  data,
  isBloqueado,
  onSuccess,
  onVerCancelados,
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
            className="h-6 w-6 opacity-0 group-hover:opacity-100 rounded-md text-gray-400 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center"
            title="Mais opções do dia"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="text-xs font-bold text-gray-500">
            Opções do Dia
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {agendamentos.length > 0 && (
            <MenuItemDesmarcar
              onSelect={() => setOpenDesmarcar(true)}
              quantidadeAgendamentos={agendamentos.length}
            />
          )}

          <MenuItemVerCancelados onSelect={() => onVerCancelados?.()} />
          
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


