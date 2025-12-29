interface DesmarcarPayload {
  agendamento_id?: number;
  agendamento_ids?: number[];
}

export function buildDesmarcarPayload(agendamentoIds: number[]): DesmarcarPayload {
  // Se for apenas um agendamento, usa agendamento_id, senão usa agendamento_ids
  return agendamentoIds.length === 1
    ? { agendamento_id: agendamentoIds[0] }
    : { agendamento_ids: agendamentoIds };
}
