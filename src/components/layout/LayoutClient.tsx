'use client'

import React from 'react'

import styles from './LayoutClient.module.scss'

interface LayoutClientProps {
  children: React.ReactNode
}

export function LayoutClient({ children }: LayoutClientProps) {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  )
}
