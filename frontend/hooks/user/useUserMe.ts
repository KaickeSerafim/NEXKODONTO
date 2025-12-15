import { fetchUserMe } from "@/lib/api/user/userMe"
import { useQuery } from "@tanstack/react-query"

export function useUserMe() {
  return useQuery({
    queryKey: ["userMe"],
    queryFn: fetchUserMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}