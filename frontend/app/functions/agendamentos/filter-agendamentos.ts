import { Agendamento } from "@/app/schemas/agendamento/agendamento";

export const getAgendamentosAtivos = (agendamentos: Agendamento[]) => {
  return agendamentos.filter(ag => ag.status !== 'cancelada');
};

export const getAgendamentosCancelados = (agendamentos: Agendamento[]) => {
  return agendamentos.filter(ag => ag.status === 'cancelada');
};

export const sortAgendamentosByTime = (agendamentos: Agendamento[]) => {
  return [...agendamentos].sort((a, b) => {
    const dateA = a.data_hora || "";
    const dateB = b.data_hora || "";
    return dateA.localeCompare(dateB);
  });
};
