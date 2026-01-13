
import { UseFormReturn } from "react-hook-form";
import { CreateAgendamento } from "@/app/schemas/agendamento/agendamento";

/**
 * Atualiza o horário da consulta no formulário, mantendo a data atual.
 */
export const atualizarHorarioConsulta = (
  form: UseFormReturn<CreateAgendamento>,
  time: string,
  selectedDate: string
) => {
  const currentDate = selectedDate || new Date().toISOString().split("T")[0];
  form.setValue("data_hora", `${currentDate}T${time}:00`);
};

/**
 * Atualiza a data da consulta, preservando o horário se já estiver selecionado.
 */
export const atualizarDataConsulta = (
  form: UseFormReturn<CreateAgendamento>,
  date: string,
  selectedTime?: string
) => {
  if (!date) {
    form.setValue("data_hora", "");
    return;
  }
  
  // Sempre mantém a data, com ou sem horário
  if (selectedTime) {
    form.setValue("data_hora", `${date}T${selectedTime}:00`);
  } else {
    // Mantém a data com horário placeholder para garantir que o date picker funcione
    // Mas sem definir um horário válido para submissão se não tiver selectedTime
    // Nota: O Form espera string, então T00:00:00 é um placeholder
    form.setValue("data_hora", `${date}T00:00:00`);
  }
};
