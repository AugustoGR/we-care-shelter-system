'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
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
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Nome
            </label>
            <div className={styles.inputIconWrapper}>
              <Image
                src="/img/user-icon.svg"
                alt="User"
                width={16}
                height={16}
                className={styles.icon}
              />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                className={styles.input}
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <div className={styles.inputIconWrapper}>
              <Image
                src="/img/mail-icon.svg"
                alt="Mail"
                width={16}
                height={16}
                className={styles.icon}
              />
              <Input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <div className={styles.inputIconWrapper}>
              <Image
                src="/img/lock-icon.svg"
                alt="Lock"
                width={16}
                height={16}
                className={styles.icon}
              />
              <Input
                id="password"
                type="password"
                placeholder="********"
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirmar Senha
            </label>
            <div className={styles.inputIconWrapper}>
              <Image
                src="/img/lock-icon.svg"
                alt="Lock"
                width={16}
                height={16}
                className={styles.icon}
              />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                className={styles.input}
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            {errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>

          <Button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Criando conta...' : 'Concluir Cadastro'}
          </Button>
        </form>
      </div>
    </main>
  )
}
