import { api } from "@/lib/api/axios";
import { CreatePacienteData } from "@/app/schemas/paciente/createPaciente";

export async function CreatePaciente(data: CreatePacienteData) {
  const response = await api.post("/pacientes/", data);
  return response.data;
}
