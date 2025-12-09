import { LoginFormData } from "@/app/schemas/login";
import { fetcherPublic } from "../api";

export async function Login( data  : LoginFormData ) {
    
  try {
   
    const urlLogin = "login/"; // seu endpoint de login relativo
    const res = await fetcherPublic(urlLogin, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include", // envia cookies para backend
    });

      return res; 
      
  } catch (err: any) {
    // Lança o erro para ser tratado no onSubmit
    throw new Error(err.message || "Erro ao fazer login");
  }
}
