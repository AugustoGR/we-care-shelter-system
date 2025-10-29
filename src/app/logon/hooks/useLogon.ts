import React, { useState } from 'react'

import { useAuth } from '@/contexts/AuthContext'

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const useLogon = () => {
  const { register } = useAuth()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validar nome
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Validar senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres'
    }

    // Validar confirmação de senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não correspondem'
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
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        'Erro ao criar conta. Tente novamente.'
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
