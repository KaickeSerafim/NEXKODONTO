export const getStatusPagamentoConfig = (status: string) => {
  switch (status) {
    case "pago":
      return {
        label: "PAGO",
        className: "bg-green-100 text-green-700 border-green-800 pl-2 pr-4",
        icon: "Check",
      };
    case "pendente":
      return {
        label: "Pendente",
        className: "bg-yellow-100 text-yellow-700 border-yellow-800",
        icon: "AlertCircle",
      };
    case "cancelado":
      return {
        label: "CANCELADO",
        className: "bg-red-100 text-red-700 border-red-800",
        icon: "XCircle",
        
      };
    default:
      return {
        label: status,
          className: "bg-gray-100 text-gray-700 border-gray-800",
            icon: "Info",
      };
  }
};
