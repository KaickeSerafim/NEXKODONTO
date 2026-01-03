"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, MoreVertical, Lock, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import { AppointmentItem } from "./appointment-item";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";
import { Bloqueio } from "@/app/schemas/bloqueio/bloqueio";
import ButtonOpcoesDiaCalendario from "./button-opcoes-dia-calendario";

interface DiaCalendarioProps {
  day: number;
  activeDay: boolean;
  agendamentos: Agendamento[];
  bloqueios: Bloqueio[];
  data: string;
  animationDelay: number;
}

export function DiaCalendario({ day, activeDay, agendamentos, bloqueios, data, animationDelay }: DiaCalendarioProps) {
  const [mostrarCancelados, setMostrarCancelados] = useState(false);
  
  const isBloqueado = bloqueios.length > 0;
  const isBloqueioTotal = bloqueios.some(b => !b.hora_inicio && !b.hora_fim);
  
  // Filtra agendamentos cancelados (status === 'cancelada')
  const agendamentosAtivos = agendamentos.filter(ag => ag.status !== 'cancelada');
  const agendamentosCancelados = agendamentos.filter(ag => ag.status === 'cancelada');
  

  const agendamentosVisiveis = mostrarCancelados ? agendamentos : agendamentosAtivos;
  const sortedAgendamentos = [...agendamentosVisiveis].sort((a, b) => {
    const dateA = a.data_hora || "";
    const dateB = b.data_hora || "";
    return dateA.localeCompare(dateB);
  });

  const handleToggleCancelados = () => {
    setMostrarCancelados(!mostrarCancelados);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: animationDelay }}
      className={cn(
        "h-[180px] border border-slate-800 p-2 group transition-all relative overflow-hidden flex flex-col",
        activeDay ? "bg-primary/[0.02]" : "hover:bg-gray-50/50",
        isBloqueado && "bg-red-50/30 border-yellow-500"
      )}
    >
      <div className="flex justify-between items-center mb-1.5 px-1">
        <span className={cn(
          "text-xs font-black w-6 h-6 flex items-center justify-center rounded-lg transition-all",
          activeDay ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-gray-400 group-hover:text-gray-900"
        )}>
          {day}
        </span>
        
        {agendamentosAtivos.length > 0 ? (
          <ButtonOpcoesDiaCalendario 
            agendamentos={agendamentosAtivos}
            data={data}
            isBloqueado={isBloqueado}
            onVerCancelados={handleToggleCancelados}
          />
        ) : agendamentosCancelados.length > 0 ? (
          <ButtonOpcoesDiaCalendario 
            agendamentos={[]}
            data={data}
            isBloqueado={isBloqueado}
            onVerCancelados={handleToggleCancelados}
          />
        ) : (
          <div className="flex items-center gap-1">
            <ButtonOpcoesDiaCalendario 
              agendamentos={[]}
              data={data}
              isBloqueado={isBloqueado}
            />

          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-1 pb-1">
        {/* Bloqueio Total Overlay */}
        {isBloqueioTotal && agendamentosAtivos.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-40 pointer-events-none">
            <Lock className="w-5 h-5 text-red-400 mb-1" />
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter">Bloqueado</span>
          </div>
        )}

        {/* Bloqueios Parciais (Renderizados como itens) */}
        {!isBloqueioTotal && bloqueios.map((bloqueio) => (
          <div 
            key={bloqueio.id} 
            className="flex items-center gap-2 p-1.5 bg-red-50/50 border border-red-100 rounded-lg group/item transition-all hover:bg-red-100/50"
            title={bloqueio.motivo || "Horário Bloqueado"}
          >
            <Lock className="w-3 h-3 text-red-500 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-black text-red-700 leading-none">
                {bloqueio.hora_inicio?.substring(0, 5)} - {bloqueio.hora_fim?.substring(0, 5)}
              </span>
              {bloqueio.motivo && (
                <span className="text-[9px] text-red-500 font-medium truncate mt-0.5 opacity-80">
                  {bloqueio.motivo}
                </span>
              )}
            </div>
          </div>
        ))}

        {sortedAgendamentos.length > 0 ? (
          sortedAgendamentos.map((ag) => (
            <AppointmentItem key={ag.id} agendamento={ag} />
          ))
        ) : !isBloqueado && (
          <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
            <Stethoscope className="w-6 h-6 text-gray-300" />
          </div>
        )}
      </div>
      
      {/* Indicador visual quando mostrando cancelados */}
      {mostrarCancelados && agendamentosCancelados.length > 0 && (
        <div className="absolute bottom-1 right-1 text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">
          Mostrando cancelados
        </div>
      )}
    </motion.div>
  );
}
