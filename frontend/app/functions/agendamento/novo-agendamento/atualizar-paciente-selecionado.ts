
import { UseFormReturn } from "react-hook-form";
import { CreateAgendamento } from "@/app/schemas/agendamento/agendamento";
import { Paciente } from "@/app/schemas/paciente/paciente";

/**
 * Atualiza os dados do formulário quando um paciente é selecionado.
 */
export const atualizarPacienteSelecionado = (
  form: UseFormReturn<CreateAgendamento>,
  paciente: Paciente
) => {
  if (paciente.id) {
    form.setValue("paciente_id", paciente.id);
  }
};
