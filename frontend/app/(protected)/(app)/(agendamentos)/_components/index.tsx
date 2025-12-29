"use client";

import React, { useState, useMemo } from "react";
import { 
  DIAS_DA_SEMANA_ABBR, 
  getDaysInMonth, 
  getFirstDayOfMonth, 
  formatDateToYYYYMMDD,
  isSameDay 
} from "@/lib/calendar-utils";
import { CalendarioHeader } from "./calendario-header";
import { DiaCalendario } from "./dia-calendario";
import { Agendamento } from "@/app/schemas/agendamento/agendamento";
import { useBloqueios } from "@/hooks/user/useBloqueio";

interface CalendarioAgendamentoProps {
  agendamentos: Agendamento[];
}

export default function CalendarioAgendamento({ agendamentos }: CalendarioAgendamentoProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: bloqueios } = useBloqueios();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month]);
  const firstDayOfMonth = useMemo(() => getFirstDayOfMonth(year, month), [year, month]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const setToday = () => setCurrentDate(new Date());

  const getAgendamentosForDay = (day: number) => {
    const dateStr = formatDateToYYYYMMDD(year, month, day);
    return agendamentos.filter((a) => {
      const dateObj = new Date(a.data_hora);
      const localDateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
      return localDateStr === dateStr;
    });
  };

  const getBloqueiosForDay = (day: number) => {
    const dateStr = formatDateToYYYYMMDD(year, month, day);
    return bloqueios?.filter(b => b.data === dateStr) || [];
  };

  const checkIsToday = (day: number) => {
    return isSameDay(day, month, year, new Date());
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col min-h-[800px]">
      <CalendarioHeader 
        month={month} 
        year={year} 
        onPrev={prevMonth} 
        onNext={nextMonth} 
        onToday={setToday} 
      />

      {/* Grid Header */}
      <div className="grid grid-cols-7 bg-gray-50/30 border-b border-gray-100">
        {DIAS_DA_SEMANA_ABBR.map((dia) => (
          <div key={dia} className="py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">
            {dia}
          </div>
        ))}
      </div>

      {/* Grid de Dias */}
      <div className="grid grid-cols-7 flex-1">
        {/* Placeholder dias anteriores */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[160px] border-b border-r border-gray-50/50 bg-gray-50/10" />
        ))}

        {/* Dias Ativos */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayAgendamentos = getAgendamentosForDay(day);
          const activeDay = checkIsToday(day);
          const dayBloqueios = getBloqueiosForDay(day);
          const dateStr = formatDateToYYYYMMDD(year, month, day);

          return (
            <DiaCalendario 
              key={day}
              day={day}
              activeDay={activeDay}
              agendamentos={dayAgendamentos}
              bloqueios={dayBloqueios}
              data={dateStr}
              animationDelay={i * 0.005}
            />
          );
        })}

        {/* Placeholder dias seguintes */}
        {Array.from({ length: (7 - (firstDayOfMonth + daysInMonth) % 7) % 7 }).map((_, i) => (
          <div key={`empty-end-${i}`} className="min-h-[160px] border-b border-r border-gray-50/50 bg-gray-50/10" />
        ))}
      </div>
    </div>
  );
}
