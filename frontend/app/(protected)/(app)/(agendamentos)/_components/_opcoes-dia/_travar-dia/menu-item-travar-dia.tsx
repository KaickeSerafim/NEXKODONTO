"use client";

import React from "react";
import { Lock, Unlock } from "lucide-react";
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface MenuItemTravarDiaProps {
  isBloqueado: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function MenuItemTravarDia({ isBloqueado, onSelect, disabled }: MenuItemTravarDiaProps) {
  return (
    <DropdownMenuItem
      className={`cursor-pointer gap-2 ${isBloqueado ? 'text-amber-600 focus:text-amber-700 focus:bg-amber-50' : 'text-gray-700 focus:bg-gray-50'}`}
      onSelect={(e) => {
        e.preventDefault();
        onSelect();
      }}
      disabled={disabled}
    >
      {isBloqueado ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
      <div className="flex flex-col">
        <span className="text-xs font-bold">{isBloqueado ? "Destravar Dia" : "Travar Dia"}</span>
        <span className="text-[10px] opacity-70">
          {isBloqueado ? "Permitir novos agendamentos" : "Bloquear novos agendamentos"}
        </span>
      </div>
    </DropdownMenuItem>
  );
}
