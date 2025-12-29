"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDesmarcarAgendamentos } from "@/hooks/agendamento/useDesmarcarAgendamentos";
import { DialogDesmarcarAgendamentos } from "./_opcoes-dia/_desmarcar/dialog-desmarcar-agendamentos";
import { MenuItemDesmarcar, MenuItemVerCancelados } from "./_opcoes-dia/_desmarcar/menu-items";
import { buildDesmarcarPayload } from "./_opcoes-dia/_desmarcar/desmarcar-utils";
import { handleDesmarcarSuccess, handleDesmarcarError } from "./_opcoes-dia/_desmarcar/desmarcar-handlers";

interface ButtonOpcoesDiaCalendarioProps {
  agendamentoIds: number[];
  onSuccess?: () => void;
  onVerCancelados?: () => void;
}

export default function ButtonOpcoesDiaCalendario({
  agendamentoIds,
  onSuccess,
  onVerCancelados,
}: ButtonOpcoesDiaCalendarioProps) {
  const [openDesmarcar, setOpenDesmarcar] = useState(false);
  const { mutate: desmarcarAgendamentos, isPending } = useDesmarcarAgendamentos();

  const handleDesmarcar = () => {
    const payload = buildDesmarcarPayload(agendamentoIds);

    desmarcarAgendamentos(payload, {
      onSuccess: (data) => {
        handleDesmarcarSuccess(data);
        setOpenDesmarcar(false);
        onSuccess?.();
      },
      onError: (error) => {
        handleDesmarcarError(error);
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="h-6 w-6 opacity-0 group-hover:opacity-100 rounded-md text-gray-400 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center"
            title="Opções do dia"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="text-xs font-bold text-gray-500">
            Opções do Dia
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {agendamentoIds.length > 0 && (
            <MenuItemDesmarcar
              onSelect={() => setOpenDesmarcar(true)}
              quantidadeAgendamentos={agendamentoIds.length}
            />
          )}

                  <MenuItemVerCancelados onSelect={() => onVerCancelados?.()} />
                  
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogDesmarcarAgendamentos
        open={openDesmarcar}
        onOpenChange={setOpenDesmarcar}
        onConfirm={handleDesmarcar}
        isPending={isPending}
        quantidadeAgendamentos={agendamentoIds.length}
      />
    </>
  );
}

