import { api } from "../axios"
import { userMeResponse, UserMeResponse } from "@/app/schemas/user/userMe"

export async function fetchUserMe(): Promise<UserMeResponse> {
  try {
    const response = await api.get('/user/me/')
    
    // Valida resposta com Zod
    const validatedResponse = userMeResponse.parse(response.data)
    
    if (validatedResponse.status === 'error') {
      throw new Error(validatedResponse.message)
    }
    
    return validatedResponse
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message || "Erro ao buscar dados do usuário")
  }
}
