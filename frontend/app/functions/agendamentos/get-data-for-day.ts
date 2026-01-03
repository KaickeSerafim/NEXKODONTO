import { Agendamento } from "@/app/schemas/agendamento/agendamento";
import { Bloqueio } from "@/app/schemas/bloqueio/bloqueio";
import { formatDateToYYYYMMDD } from "@/lib/calendar-utils";

export const getAgendamentosForDay = (
  agendamentos: Agendamento[], 
  year: number, 
  month: number, 
  day: number
) => {
  const dateStr = formatDateToYYYYMMDD(year, month, day);
  return agendamentos.filter((a) => {
    if (!a.data_hora) return false;
    const dateObj = new Date(a.data_hora);
    const localDateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
    return localDateStr === dateStr;
  });
};

export const getBloqueiosForDay = (
  bloqueios: Bloqueio[] | undefined, 
  year: number, 
  month: number, 
  day: number
) => {
  const dateStr = formatDateToYYYYMMDD(year, month, day);
  return bloqueios?.filter(b => b.data === dateStr) || [];
};
