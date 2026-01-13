export const getStatusConfig = (status: string) => {
  switch (status) {
    case "confirmada":
      return {
        label: "Confirmada",
        className: "bg-green-100 text-green-700 border-green-200",
      };
    case "agendada":
      return {
        label: "Agendada",
        className: "bg-yellow-100 text-yellow-700 border-yellow-200",
      };
    case "concluida":
      return {
        label: "Concluída",
        className: "bg-blue-100 text-blue-700 border-blue-200",
      };
    case "faltou":
      return {
        label: "Faltou",
        className: "bg-pink-100 text-pink-700 border-pink-200",
      };
    case "cancelada":
      return {
        label: "Cancelada",
        className: "bg-red-100 text-red-700 border-red-200",
      };
    default:
      return {
        label: status,
        className: "bg-gray-100 text-gray-700 border-gray-200",
      };
  }
};
