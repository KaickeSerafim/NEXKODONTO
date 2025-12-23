export const DIAS_DA_SEMANA_ABBR = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export const isSameDay = (day: number, month: number, year: number, dateToCompare: Date) => {
  return (
    dateToCompare.getDate() === day &&
    dateToCompare.getMonth() === month &&
    dateToCompare.getFullYear() === year
  );
};

export const formatDateToYYYYMMDD = (year: number, month: number, day: number) => {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};
