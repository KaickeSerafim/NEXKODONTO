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
