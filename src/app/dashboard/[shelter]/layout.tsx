'use client'
import React from 'react'

import { Header } from '@/components/layout/Header/Header'
import { Nav } from '@/components/layout/Nav/Nav'

import styles from './ShelterLayout.module.scss'

interface ShelterLayoutProps {
  children: React.ReactNode
}

export default function ShelterLayout({ children }: ShelterLayoutProps) {
  const [isNavOpen, setIsNavOpen] = React.useState(false)

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  const closeNav = () => {
    setIsNavOpen(false)
  }

  return (
    <>
      <Header onMenuToggle={toggleNav} />
      <Nav isOpen={isNavOpen} onClose={closeNav} />
      <main className={styles.main}>{children}</main>
    </>
  )
}
