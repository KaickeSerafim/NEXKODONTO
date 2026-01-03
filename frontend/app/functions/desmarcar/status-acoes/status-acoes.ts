import { toast } from "sonner";
import { DesmarcarAgendamentosResponse } from "@/app/schemas/agendamento/desmarcarAgendamentos";

export function handleDesmarcarSuccess(data: DesmarcarAgendamentosResponse) {
  const { total_processados, total_erros, erros, resultados } = data.data;
  
  const reagendados = resultados.filter(r => r.reagendado);
  const cancelados = resultados.filter(r => !r.reagendado);

  if (total_processados > 0) {
    if (reagendados.length > 0 && cancelados.length > 0) {
      toast.success(`${cancelados.length} cancelado(s) e ${reagendados.length} reagendado(s).`);
    } else if (reagendados.length > 0) {
      toast.success(`${reagendados.length} agendamento(s) reagendado(s) com sucesso!`);
    } else {
      toast.success(`${total_processados} agendamento(s) desmarcado(s) com sucesso!`);
    }

    // Se houver reagendados, mostrar as mensagens (futuro whatsapp)
    reagendados.forEach(r => {
      if (r.mensagem) {
        toast.info(r.mensagem, {
          description: "Mensagem enviada ao paciente (Simulação)",
          duration: 5000,
        });
      }
    });
  }

  if (total_erros > 0) {
    if (total_processados > 0) {
      toast.warning(
        `${total_erros} erro(s) encontrado(s).`,
        {
          description: erros.map(e => `ID ${e.agendamento_id}: ${e.erro}`).join(", "),
        }
      );
    } else {
      toast.error("Nenhum agendamento foi processado", {
        description: erros.map(e => `ID ${e.agendamento_id}: ${e.erro}`).join(", "),
      });
    }
  }
}

export function handleDesmarcarError(error: Error) {
  toast.error("Erro ao desmarcar agendamento(s)", {
    description: error.message,
  });
  console.error(error);
}
