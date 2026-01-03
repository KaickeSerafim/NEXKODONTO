export const getStatusConfig = (status: string) => {
  switch (status) {
    case "confirmada":
      return {
        label: "Confirmada",
        className: "bg-green-100 text-green-700 border-green-800",
      };
    case "agendada":
    case "pendente":
      return {
        label: "Pendente",
        className: "bg-yellow-100 text-yellow-700 border-yellow-800",
      };
    case "concluida":
      return {
        label: "Concluída",
        className: "bg-emerald-100 text-emerald-700 border-emerald-800",
      };
    case "cancelada":
    case "faltou":
      return {
        label: status === "cancelada" ? "Cancelada" : "Faltou",
        className: "bg-red-100 text-red-700 border-red-800",
      };
    default:
      return {
        label: status,
        className: "bg-gray-100 text-gray-700 border-gray-800",
      };
  }
};
