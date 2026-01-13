"use client";

import { useDisponibilidade } from "@/hooks/agendamento/useDisponibilidade";
import { cn } from "@/lib/utils/utils";
import { Loader2, Check, Clock, User } from "lucide-react";

interface SearchHorarioProps {
  date: string;
  onSelect: (time: string) => void;
  selectedTime?: string;
}

export default function SearchHorario({ date, onSelect, selectedTime }: SearchHorarioProps) {
  const { data, isLoading, error } = useDisponibilidade(date);

  if (!date) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl bg-gray-50/50 text-gray-400">
        <Clock className="w-8 h-8 mb-2 opacity-20" />
        <p className="text-sm font-medium">Selecione uma data para ver horários</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg">
        Erro ao carregar horários. Tente novamente.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">
          Horários Disponíveis
        </h4>
        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            <span className="text-gray-400">Livre</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="text-yellow-600">Pendente</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-emerald-600">Ocupado</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {data?.slots.map((slot) => {
          const isSelected = selectedTime === slot.hora;
          
          let bgColor = "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-100";
          let cursor = "cursor-pointer";
          let opacity = "opacity-100";

          if (slot.status === 'pendente') {
            bgColor = "bg-yellow-50 text-yellow-700 border-yellow-100 cursor-not-allowed";
            cursor = "cursor-not-allowed";
          } else if (slot.status === 'ocupado') {
            bgColor = "bg-emerald-50 text-emerald-700 border-emerald-100 cursor-not-allowed";
            cursor = "cursor-not-allowed";
          } else if (slot.status === 'bloqueado') {
            bgColor = "bg-red-50 text-red-700 border-red-100";
            cursor = "cursor-not-allowed";
            opacity = "opacity-50";
          }

          if (isSelected) {
            bgColor = "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105 z-10";
          }

          return (
            <button
              key={slot.hora}
              type="button"
              disabled={!slot.disponivel}
              onClick={() => slot.disponivel && onSelect(slot.hora)}
              className={cn(
                "relative group flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 font-bold text-sm",
                bgColor,
                cursor,
                opacity,
                isSelected ? "ring-2 ring-primary ring-offset-2" : ""
              )}
              title={slot.paciente ? `Paciente: ${slot.paciente}` : slot.status}
            >
              <span>{slot.hora}</span>
              {isSelected && <Check className="w-3 h-3 mt-1" />}
              {!slot.disponivel && slot.paciente && slot.status !== 'bloqueado' && (
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full border border-white bg-current" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
