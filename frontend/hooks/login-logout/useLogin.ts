import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/login/login";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      // 1. Invalida as queries imediatamente
      queryClient.invalidateQueries({ queryKey: ["userMe"] });

      // 2. Aguarda 1.5 segundos (1500ms) para garantir que o usuário veja seu loading
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 3. Força o refresh e redireciona
      router.refresh();
      window.location.href = "/dashboard";
    },
    onError: (error: Error) => {
      console.error("Erro no login:", error.message);
    },
  });
}
