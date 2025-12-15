import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function checkAuth(): Promise<boolean> {
  const cookieStore = cookies();
  
  const hasAccess = cookieStore.has("access");
  
  if (!hasAccess) {
    return false;
  }

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  try {
    const response = await fetch(`${API_BASE_URL}/user/me/`, {
      headers: {
        'Cookie': cookieHeader,
        'Content-Type': 'application/json',
      },
      cache: "no-store",
    });

    return response.ok;
  } catch {
    return false;
  }
}
