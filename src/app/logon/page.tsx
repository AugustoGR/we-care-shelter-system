'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/Form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'

import styles from './Logon.module.scss'

export default function Logon() {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
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
        error.response?.data?.message || 'Erro ao criar conta. Tente novamente.'
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

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/img/logo-logon-5c98b7.png"
            alt="Logo"
            width={187}
            height={62.5}
            className={styles.logoImage}
          />
        </div>
        <h1 className={styles.title}>Criar uma conta</h1>
        <h2 className={styles.subtitle}>
          Preencha seus dados para se registrar.
        </h2>

        {apiError && <div className={styles.errorMessage}>{apiError}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <FormField label="Nome" error={errors.name}>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              icon="/img/user-icon.svg"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />
          </FormField>

          <FormField label="Email" error={errors.email}>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              icon="/img/mail-icon.svg"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </FormField>

          <FormField label="Senha" error={errors.password}>
            <Input
              id="password"
              type="password"
              placeholder="********"
              icon="/img/lock-icon.svg"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </FormField>

          <FormField label="Confirmar Senha" error={errors.confirmPassword}>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              icon="/img/lock-icon.svg"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
            />
          </FormField>

          <Button
            type="submit"
            variant="primary"
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Criando conta...' : 'Concluir Cadastro'}
          </Button>
        </form>
      </div>
    </main>
  )
}
