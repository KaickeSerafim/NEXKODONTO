import { toast } from "sonner";

/**
 * Toast de sucesso ao criar agendamento
 */
export const sucessoCriarAgendamento = () => {
  toast.success("Agendamento criado!", {
    description: "O agendamento foi realizado com sucesso.",
  });
};

/**
 * Toast de erro ao criar agendamento
 */
export const erroCriarAgendamento = (mensagem?: string) => {
  toast.error("Erro ao criar agendamento", {
    description: mensagem || "Ocorreu um erro inesperado.",
  });
};

/**
 * Toast de campo obrigatório
 */
export const campoObrigatorio = (campo: string) => {
  toast.error("Campo obrigatório", {
    description: `Por favor, ${campo}.`,
  });
};

/**
 * Toast de erro para agendamento no passado
 */
export const erroAgendamentoPassado = () => {
  toast.error("Agendamento no passado", {
    description: "Não é possível criar agendamentos para datas ou horários que já passaram.",
  });
};
