import React from "react";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";

interface StatusCountersProps {
  agendamentos: Agendamento[];
}

export function StatusCounters({ agendamentos }: StatusCountersProps) {
  if (agendamentos.length === 0) return null;

  const agendamentosAtivos = agendamentos.filter(ag => ["agendada", "confirmada"].includes(ag.status || ""));
  const agendamentosConcluida = agendamentos.filter(ag => ag.status === "concluida");
  const agendamentosCancelados = agendamentos.filter(ag => ag.status === "cancelada");
  const agendamentosFaltou = agendamentos.filter(ag => ag.status === "faltou");

  const totalCanceladosFaltas = agendamentosCancelados.length + agendamentosFaltou.length;

  return (
    <div className="flex items-center gap-4 ml-1">
      {/* Grupo: Agendada/Confirmada (Verde/Amarelo) */}
      <div className="flex flex-col items-center justify-center leading-none">
        <span className="text-[7px] font-bold text-green-600 uppercase tracking-tighter">Ativos</span>
        <span className="text-[10px] font-black text-green-700">{agendamentosAtivos.length}</span>
      </div>
      
      {/* Grupo: Concluída (Azul) */}
      <div className="flex flex-col items-center justify-center leading-none">
        <span className="text-[7px] font-bold text-blue-600 uppercase tracking-tighter">Concluidos</span>
        <span className="text-[10px] font-black text-blue-700">{agendamentosConcluida.length}</span>
      </div>

      {/* Grupo: Cancelada/Falta (Vermelho/Rosa) */}
      <div className="flex flex-col items-center justify-center leading-none">
        <span className="text-[7px] font-bold text-red-600 uppercase tracking-tighter">Cancel/ <br />Faltas</span>
        <span className="text-[10px] font-black text-red-700">
          {totalCanceladosFaltas}
        </span>
      </div>
    </div>
  );
}
