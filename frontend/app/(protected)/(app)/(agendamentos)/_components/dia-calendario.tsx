"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import { AppointmentItem } from "./appointment-item";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";

interface DiaCalendarioProps {
  day: number;
  activeDay: boolean;
  agendamentos: Agendamento[];
  animationDelay: number;
}

export function DiaCalendario({ day, activeDay, agendamentos, animationDelay }: DiaCalendarioProps) {
  const sortedAgendamentos = [...agendamentos].sort((a, b) => a.data_hora.localeCompare(b.data_hora));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: animationDelay }}
      className={cn(
        "h-[180px] border border-slate-800 p-2 group transition-all relative overflow-hidden flex flex-col",
        activeDay ? "bg-primary/[0.02]" : "hover:bg-gray-50/50"
      )}
    >
      <div className="flex justify-between items-center mb-1.5 px-1">
        <span className={cn(
          "text-xs font-black w-6 h-6 flex items-center justify-center rounded-lg transition-all",
          activeDay ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-gray-400 group-hover:text-gray-900"
        )}>
          {day}
        </span>
        
        <button className="h-6 w-6 opacity-0 group-hover:opacity-100 rounded-md text-gray-400 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center">
           <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-1 pb-1">
        {sortedAgendamentos.length > 0 ? (
          sortedAgendamentos.map((ag) => (
            <AppointmentItem key={ag.id} agendamento={ag} />
          ))
        ) : (
          <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
            <Stethoscope className="w-6 h-6 text-gray-300" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
