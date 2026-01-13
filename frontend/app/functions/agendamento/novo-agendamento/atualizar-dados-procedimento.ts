
import { UseFormReturn } from "react-hook-form";
import { CreateAgendamento } from "@/app/schemas/agendamento/agendamento";
import { Procedimento } from "@/app/schemas/procedimento/procedimento";

/**
 * Atualiza os dados do formulário quando um procedimento é selecionado.
 * Define o ID, valor e duração estimada.
 */
export const atualizarDadosProcedimento = (
  form: UseFormReturn<CreateAgendamento>,
  procedimento: Procedimento
) => {
  if (procedimento.id) {
    form.setValue("procedimento_id", procedimento.id);
    // Sempre atualiza o valor e duração com os dados do procedimento
    // O usuário ainda pode alterar manualmente após a seleção
    form.setValue("valor", Number(procedimento.preco_base));
    form.setValue("duracao_estimada", Number(procedimento.duracao_minutos));
  } else {
    form.setValue("procedimento_id", null);
    form.setValue("valor", 0);
    form.setValue("duracao_estimada", 0);
  }
};
