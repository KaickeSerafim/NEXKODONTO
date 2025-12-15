import { ApiResponse, apiResponseSchema } from "@/app/schemas/response/apiResponse";
import { api } from "../axios";


export async function LogoutUser(): Promise<ApiResponse> {
  try {
    const response = await api.post("logout/");


    // Valida resposta com Zod
    const validatedResponse = apiResponseSchema.parse(response.data);

    if (validatedResponse.status === "error") {
      throw new Error(validatedResponse.message);
    }

    return validatedResponse;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Erro ao fazer logout");
  }
}
