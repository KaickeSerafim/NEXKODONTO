import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para refresh automático
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Evita loop infinito e não tenta refresh em rotas de login/refresh
    if (
      error.response?.status === 401 && 
      !originalRequest._retry &&
      !originalRequest.url?.includes('/login/') &&
      !originalRequest.url?.includes('/refresh/')
    ) {
      originalRequest._retry = true

      try {
        await api.post('refresh/')
        return api(originalRequest)
      } catch (refreshError) {
        // Se refresh falhar, redireciona para login
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
        throw refreshError
      }
    }

    throw error
  }
)

export { api }