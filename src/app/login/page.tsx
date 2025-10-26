'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/Form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'

import styles from './Login.module.scss'

export default function Login() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
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

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Image
              src="/img/logo-5c98b7.png"
              alt="Logo"
              width={187}
              height={62.5}
              className={styles.logoImage}
            />
          </div>
          <h2 className={styles.subtitle}>Acessar sua Conta</h2>

          {apiError && <div className={styles.errorMessage}>{apiError}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <FormField label="Email" error={errors.email}>
              <Input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </FormField>

            <FormField label="Senha" error={errors.password}>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
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
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          <div className={styles.signupRow}>
            <span className={styles.signupText}>Não tem uma conta? </span>
            <Link href="/logon" className={styles.signupButton}>
              Crie uma aqui.
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.imageContainer}>
            <Image
              src="/img/side-image-149efe.png"
              alt="Ilustração"
              width={384}
              height={288}
              className={styles.sideImage}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
