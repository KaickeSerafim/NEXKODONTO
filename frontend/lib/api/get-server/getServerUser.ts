import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { userMeResponse, UserMeResponse } from "@/app/schemas/user/userMe";

const LOGIN_PATH = "/login/";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerUser(): Promise<UserMeResponse> {
  const cookieStore = cookies();

  // ✅ Só verifica existência
  const hasAccess = cookieStore.has("access");

  if (!hasAccess) {
    redirect(LOGIN_PATH);
  }

  // ✅ Encaminha os cookies para o backend
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await fetch(`${API_BASE_URL}/user/me/?t=${Date.now()}`, {
    headers: {
      'Cookie': cookieHeader,
      'Content-Type': 'application/json',
    },
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (response.status === 401) {
    redirect(LOGIN_PATH);
  }

  if (!response.ok) {
    redirect(LOGIN_PATH);
  }

  const data = await response.json();
  return userMeResponse.parse(data);
}
