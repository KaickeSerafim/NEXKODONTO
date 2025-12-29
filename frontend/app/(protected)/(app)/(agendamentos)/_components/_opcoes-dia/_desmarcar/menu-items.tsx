"use client";

import React from "react";
import { XCircle, Eye } from "lucide-react";
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface MenuItemDesmarcarProps {
  onSelect: () => void;
  quantidadeAgendamentos: number;
}

export function MenuItemDesmarcar({ onSelect, quantidadeAgendamentos }: MenuItemDesmarcarProps) {
  return (
    <DropdownMenuItem
      className="cursor-pointer gap-2 text-red-600 focus:text-red-700 focus:bg-red-50"
      onSelect={(e) => {
        e.preventDefault();
        onSelect();
      }}
    >
      <XCircle className="w-4 h-4" />
      <div className="flex flex-col">
        <span className="text-xs font-bold">Desmarcar Agendamentos</span>
        <span className="text-[10px] opacity-70">
          Cancelar {quantidadeAgendamentos} agendamento(s)
        </span>
      </div>
    </DropdownMenuItem>
  );
}

interface MenuItemVerCanceladosProps {
  onSelect: () => void;
}

export function MenuItemVerCancelados({ onSelect }: MenuItemVerCanceladosProps) {
  return (
    <DropdownMenuItem
      className="cursor-pointer gap-2 text-blue-600 focus:text-blue-700 focus:bg-blue-50"
      onSelect={(e) => {
        e.preventDefault();
        onSelect();
      }}
    >
      <Eye className="w-4 h-4" />
      <div className="flex flex-col">
        <span className="text-xs font-bold">Ver Cancelados</span>
        <span className="text-[10px] opacity-70">
          Mostrar agendamentos cancelados
        </span>
      </div>
    </DropdownMenuItem>
  );
}
