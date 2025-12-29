import { toast } from "sonner";

export function handleBloqueioSuccess(horaInicio?: string | null) {
  toast.success(horaInicio ? "Horário travado com sucesso!" : "Dia travado com sucesso!");
}

export function handleDesbloqueioSuccess() {
  toast.success("Todos os bloqueios do dia foram removidos!");
}

export function handleBloqueioError(error: any, action: "bloquear" | "desbloquear") {
  const title = action === "bloquear" ? "Erro ao travar agenda" : "Erro ao destravar dia";
  toast.error(title, { description: error.message });
  console.error(error);
}
