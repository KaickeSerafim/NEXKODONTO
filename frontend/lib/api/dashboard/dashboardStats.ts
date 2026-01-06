import { DashboardResponse, dashboardResponseSchema } from "@/app/schemas/dashboard/dashboard";
import { api } from "../axios";

export async function getDashboardStats(): Promise<DashboardResponse> {
  try {
    const response = await api.get("dashboard/stats/");
    
    const validatedResponse = dashboardResponseSchema.parse(response.data);

    if (validatedResponse.status === "error") {
      throw new Error(validatedResponse.message);
    }

    return validatedResponse;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Erro ao buscar dados do dashboard");
  }
}
