
import { UseFormReturn } from "react-hook-form";
import { CreateAgendamento } from "@/app/schemas/agendamento/agendamento";
import { DisponibilidadeResponse } from "@/lib/api/agendamento/agendamentoDisponibilidade";
import { atualizarHorarioConsulta } from "./gerenciar-data-hora";

/**
 * Encontra e seleciona o próximo horário disponível na grade.
 */
export const buscarProximoHorarioDisponivel = (
  form: UseFormReturn<CreateAgendamento>,
  disponibilidadeData: DisponibilidadeResponse | undefined,
  selectedDate: string
) => {
  const primeiroDisponivel = disponibilidadeData?.slots.find(
    (slot) => slot.disponivel && slot.status === "disponivel"
  );
  
  if (primeiroDisponivel) {
    atualizarHorarioConsulta(form, primeiroDisponivel.hora, selectedDate);
  }
};
