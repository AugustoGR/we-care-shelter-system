'use client'

import React from 'react'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { FormField, FormRoot } from '@/components/ui/Form'
import { Input } from '@/components/ui/input'

import { useLogon } from './hooks/useLogon'
import styles from './Logon.module.scss'

export default function Logon() {
  const { formData, errors, isLoading, apiError, handleSubmit, handleChange } =
    useLogon()

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

        <FormRoot className={styles.form} onSubmit={handleSubmit}>
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
        </FormRoot>
      </div>
    </main>
  )
}
