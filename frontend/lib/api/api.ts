// Fetcher genérico para endpoints públicos
export async function fetcherPublic(url: string, options: RequestInit = {}) {
  const hasBody = !!options.body;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: options.method || "GET",
    headers: {
      Accept: "application/json",
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = errorData.message ||  "Erro na requisição";
    throw new Error(message);
  }
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetcherAuth(url: string, options: RequestInit = {}) {
  const hasBody = !!options.body;

  const makeRequest = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      method: options.method || "GET",
      headers: {
        Accept: "application/json",
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {}),
      },
      credentials: "include", // envia cookies automaticamente
      ...options,
    });
    return res;
  };

  let res = await makeRequest();

  // Se deu 401, tenta refresh
  if (res.status === 401) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/refresh/`,
      {
        method: "POST",
        credentials: "include", // cookies do refresh token
      }
    );

    if (refreshRes.ok) {
      // Token renovado, tenta a requisição original de novo
      res = await makeRequest();
    } else {
      throw new Error("Sessão expirada. Faça login novamente.");
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Erro na requisição");
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}
