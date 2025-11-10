import { useState } from 'react'

import { useAuth } from '@/contexts/AuthContext'
import {
  usersService,
  UpdateUserData,
} from '@/services/http/users.service'

export function useUserProfile() {
  const { user, login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateUser = async (data: UpdateUserData) => {
    if (!user) {
      throw new Error('Usuário não autenticado')
    }

    setIsLoading(true)
    setError(null)

    try {
      await usersService.updateUser(user.id, data)

      // Se mudou a senha, faz login novamente para atualizar o token
      if (data.password && data.email) {
        await login({
          email: data.email,
          password: data.password,
        })
      }

      setIsLoading(false)
    } catch (err: any) {
      setIsLoading(false)
      const errorMessage =
        err.response?.data?.message || 'Erro ao atualizar perfil'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  return {
    user,
    updateUser,
    isLoading,
    error,
  }
}
