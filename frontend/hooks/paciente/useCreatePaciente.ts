import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePaciente } from "@/lib/api/paciente/pacienteCreate";
import { toast } from "sonner";

export function useCreatePaciente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreatePaciente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
      toast.success("Paciente cadastrado com sucesso!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Erro ao cadastrar paciente";
      toast.error(message);
    },
  });
}
