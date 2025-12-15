import { z } from "zod"
import { createApiResponseSchema } from "../response/apiResponse"


export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
})

export type LoginFormData = z.infer<typeof loginSchema>


export const loginResponseSchema = createApiResponseSchema(z.null())
export type LoginResponse = z.infer<typeof loginResponseSchema>