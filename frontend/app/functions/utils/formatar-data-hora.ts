import { format, addMinutes, parseISO } from "date-fns";

export const formatarDataHora = (dataHora: string) => {
  if (!dataHora) return "-";
  const data = new Date(dataHora);
  if (isNaN(data.getTime())) return "-";
  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formata uma data para o formato HH:mm
 */
export const formatarHora = (date: Date | string): string => {
  if (typeof date === 'string') {
    return format(parseISO(date), "HH:mm");
  }
  return format(date, "HH:mm");
};

/**
 * Calcula o horário de término baseado em um horário inicial e duração
 * @param dataHoraInicio - Data e hora de início no formato ISO string
 * @param duracaoMinutos - Duração em minutos
 * @returns Hora de término formatada (HH:mm) ou null se inválido
 */
export const calcularHorarioFim = (
  dataHoraInicio: string | null | undefined,
  duracaoMinutos: number | null | undefined
): string | null => {
  if (!dataHoraInicio || !duracaoMinutos) return null;
  
  try {
    // Extrair hora e minuto da string
    const timePart = dataHoraInicio.split('T')[1];
    if (!timePart) return null;
    
    const [hours, minutes] = timePart.substring(0, 5).split(':').map(Number);
    
    // Criar uma data local (não UTC)
    const inicio = new Date();
    inicio.setHours(hours, minutes, 0, 0);
    
    // Adicionar duração
    const fim = addMinutes(inicio, duracaoMinutos);
    
    // Retornar apenas HH:mm
    return format(fim, "HH:mm");
  } catch (e) {
    return null;
  }
};

/**
 * Adiciona minutos a uma data
 */
export const adicionarMinutos = (date: Date, minutes: number): Date => {
  return addMinutes(date, minutes);
};

/**
 * Converte string ISO para Date
 */
export const converterISOParaDate = (isoString: string): Date => {
  return parseISO(isoString);
};
