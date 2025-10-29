import React, { useState } from 'react'

import { useAuth } from '@/contexts/AuthContext'

interface FormData {
  email: string
  password: string
}

export const useLogin = () => {
  const { login } = useAuth()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Validar senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await login({
        email: formData.email,
        password: formData.password,
      })
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        'Erro ao fazer login. Verifique suas credenciais.'
      setApiError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }))
    }
    if (apiError) {
      setApiError('')
    }
  }

  return {
    formData,
    errors,
    isLoading,
    apiError,
    handleSubmit,
    handleChange,
  }
}
