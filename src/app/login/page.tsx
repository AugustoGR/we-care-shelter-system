'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { FormField, FormRoot } from '@/components/ui/Form'
import { Input } from '@/components/ui/input'

import { useLogin } from './hooks/useLogin'
import styles from './Login.module.scss'

export default function Login() {
  const { formData, errors, isLoading, apiError, handleSubmit, handleChange } =
    useLogin()

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

          <FormRoot className={styles.form} onSubmit={handleSubmit}>
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
          </FormRoot>
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
