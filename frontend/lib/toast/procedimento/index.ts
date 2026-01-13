import { toast } from "sonner";

/**
 * Toast de sucesso ao criar procedimento
 */
export const sucessoCriarProcedimento = () => {
  toast.success("Procedimento cadastrado com sucesso!");
};

/**
 * Toast de erro ao criar procedimento
 */
export const erroCriarProcedimento = (mensagem?: string) => {
  toast.error(mensagem || "Erro ao cadastrar procedimento");
};
