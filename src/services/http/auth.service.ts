import { UserRole } from '@/@types/userProps'

import { api } from '../api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  user: {
    id: string
    email: string
    name: string
    role: UserRole
    createdAt: string
    updatedAt: string
  }
}

class AuthService {
  private readonly TOKEN_KEY = '@WeCare:token'
  private readonly USER_KEY = '@WeCare:user'

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    this.setToken(response.data.access_token)
    this.setUser(response.data.user)
    return response.data
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data)
    this.setToken(response.data.access_token)
    this.setUser(response.data.user)
    return response.data
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY)
      localStorage.removeItem(this.USER_KEY)
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY)
    }
    return null
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token)
    }
  }

  getUser(): AuthResponse['user'] | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(this.USER_KEY)
      return user ? JSON.parse(user) : null
    }
    return null
  }

  setUser(user: AuthResponse['user']): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const authService = new AuthService()
