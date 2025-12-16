import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogoutUser } from "@/lib/api/logout/logout";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LogoutUser,
    onSuccess: () => {
      queryClient.clear();
      window.location.href = "/";
    },
  });
}
