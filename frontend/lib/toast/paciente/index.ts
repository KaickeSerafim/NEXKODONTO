import { toast } from "sonner";

/**
 * Toast de sucesso ao criar paciente
 */
export const sucessoCriarPaciente = () => {
  toast.success("Paciente cadastrado com sucesso!");
};

/**
 * Toast de erro ao criar paciente
 */
export const erroCriarPaciente = (mensagem?: string) => {
  toast.error(mensagem || "Erro ao cadastrar paciente");
};
