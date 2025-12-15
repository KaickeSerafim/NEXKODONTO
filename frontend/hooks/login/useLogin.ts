import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { loginUser } from "@/lib/api/login/login"

export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      // Aguarda um pouco para cookies serem processados
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Invalida queries e força refresh do router
      queryClient.invalidateQueries({ queryKey: ["userMe"] })
      router.refresh()
      
      // Redireciona usando window.location para forçar reload completo
      window.location.href = "/dashboard"
    },
    onError: (error: Error) => {
      console.error("Erro no login:", error.message)
    }
  })
}