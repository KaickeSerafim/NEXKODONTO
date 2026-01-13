type AgendamentoStatus =
  | "confirmada"
  | "agendada"
  | "concluida"
  | "faltou"
  | "cancelada";

type PagamentoStatus =
    | "pago"
    | "pendente"
    | "cancelado";
 

type PaymentStyles = {
  icon: string;
  bg: string;
};

export function getAgendamentoColors(
  status: AgendamentoStatus,
  pagamentoStatus?: PagamentoStatus
) {
  const isPending = status === "agendada";

  const statusColor =
    status === "confirmada"
      ? "bg-green-100/50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300"
      : status === "agendada"
      ? "bg-amber-100/60 border-amber-200 text-amber-700 hover:bg-amber-200/50 hover:border-amber-300"
      : status === "concluida"
      ? "bg-blue-100/50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
      : status === "faltou"
      ? "bg-pink-100/50 border-pink-200 text-pink-700 hover:bg-pink-100 hover:border-pink-300"
      : status === "cancelada"
      ? "bg-red-50/50 border-red-100 text-red-700 hover:bg-red-100 hover:border-red-200"
      : "bg-gray-50 border-gray-200 text-gray-700";

  const paymentStyles: PaymentStyles =
    pagamentoStatus === "pago"
      ? { icon: "text-green-600", bg: "bg-green-100" }
      : (isPending || status === "confirmada" || pagamentoStatus === "pendente")
      ? { icon: "text-amber-600", bg: "bg-amber-100" }
      : (status === "cancelada" || status === "faltou")
      ? { icon: "text-red-600", bg: "bg-red-100" }
      : { icon: "text-gray-500", bg: "bg-gray-100" };

  return {
    statusColor,
    paymentStyles,
  };
}
