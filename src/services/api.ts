import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
})

// Request interceptor - adiciona o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('@WeCare:token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor - trata erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      if (typeof window !== 'undefined') {
        localStorage.removeItem('@WeCare:token')
        localStorage.removeItem('@WeCare:user')

        // Redireciona para login apenas se não estiver em páginas públicas
        const publicPaths = ['/login', '/logon']
        const currentPath = window.location.pathname

        if (!publicPaths.includes(currentPath)) {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  },
)

export { api }
