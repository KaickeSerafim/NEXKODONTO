import { toast } from "sonner";
import { DesmarcarAgendamentosResponse } from "@/app/schemas/agendamento/desmarcarAgendamentos";

export function handleDesmarcarSuccess(data: DesmarcarAgendamentosResponse) {
  const { total_processados, total_erros, erros } = data.data;

  if (total_processados > 0 && total_erros === 0) {
    // Todos foram processados com sucesso
    toast.success(
      `${total_processados} agendamento(s) desmarcado(s) com sucesso!`
    );
  } else if (total_processados > 0 && total_erros > 0) {
    // Sucesso parcial
    toast.warning(
      `${total_processados} agendamento(s) desmarcado(s). ${total_erros} erro(s) encontrado(s).`,
      {
        description: erros.map(e => `ID ${e.agendamento_id}: ${e.erro}`).join(", "),
      }
    );
  } else {
    // Todos falharam
    toast.error("Nenhum agendamento foi desmarcado", {
      description: erros.map(e => `ID ${e.agendamento_id}: ${e.erro}`).join(", "),
    });
  }
}

export function handleDesmarcarError(error: Error) {
  toast.error("Erro ao desmarcar agendamento(s)", {
    description: error.message,
  });
  console.error(error);
}
