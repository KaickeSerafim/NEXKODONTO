import { api } from "../axios"
import {
  LoginFormData,
  loginResponseSchema,
  LoginResponse,
} from "@/app/schemas/login/login"

export async function loginUser(data: LoginFormData): Promise<LoginResponse> {

  try {
    const response = await api.post("login/", data)
    
    

    
    // Valida resposta com Zod
    const validatedResponse = loginResponseSchema.parse(response.data)

    if (validatedResponse.status === "error") {
      throw new Error(validatedResponse.message)
    }

  
    return validatedResponse
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message || "Erro ao fazer login")
  }
}