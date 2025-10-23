'use client'
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import styles from './Login.module.scss'

export default function Home() {
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
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={styles.input}
              />
            </div>
            <Button type="submit" className={styles.button}>
              Entrar
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
