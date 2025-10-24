'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

import { useRouter, usePathname } from 'next/navigation'

import {
  authService,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '@/services/http/auth.service'

interface AuthContextData {
  user: AuthResponse['user'] | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const loadUserData = () => {
      const storedUser = authService.getUser()
      const token = authService.getToken()

      if (storedUser && token) {
        setUser(storedUser)
      }
      setIsLoading(false)
    }

    loadUserData()
  }, [])

  useEffect(() => {
    // Redirecionar usuários não autenticados para login
    const publicPaths = ['/login', '/logon']
    const isPublicPath = publicPaths.includes(pathname)

    if (!isLoading && !user && !isPublicPath) {
      router.push('/login')
    }

    // Redirecionar usuários autenticados para home se tentarem acessar login/logon
    if (!isLoading && user && isPublicPath) {
      router.push('/')
    }
  }, [user, isLoading, pathname, router])

  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials)
    setUser(response.user)
    router.push('/')
  }

  const register = async (data: RegisterData) => {
    const response = await authService.register(data)
    setUser(response.user)
    router.push('/')
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
