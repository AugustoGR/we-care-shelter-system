'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { useAuth } from '@/contexts/AuthContext'

import styles from './Header.module.scss'

interface HeaderProps {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/img/logo-5c98b7.png"
              alt="We Care Logo"
              width={150}
              height={45}
              priority
              className={styles.logo}
            />
          </Link>
        </div>

        <nav className={styles.nav}>
          <div className={styles.userSection}>
            <button className={styles.notificationBtn}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={styles.badge}>3</span>
            </button>

            <button className={styles.userBtn} onClick={toggleMenu}>
              <Image
                src="/img/user-icon.svg"
                alt="User"
                width={24}
                height={24}
                className={styles.userIcon}
              />
            </button>

            {onMenuToggle && (
              <button
                className={styles.hamburgerBtn}
                onClick={onMenuToggle}
                aria-label="Toggle menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            )}

            {isMenuOpen && (
              <div className={styles.dropdown}>
                <Link href="/dashboard/profile" className={styles.dropdownItem}>
                  <Image
                    src="/img/user-icon.svg"
                    alt="Profile"
                    width={18}
                    height={18}
                  />
                  <span>Meu Perfil</span>
                </Link>
                <Link
                  href="/dashboard/settings"
                  className={styles.dropdownItem}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6m-7.07-3.07l4.24 4.24m4.24-4.24l4.24 4.24M1 12h6m6 0h6m-3.07-7.07l4.24 4.24M7.76 7.76l4.24 4.24" />
                  </svg>
                  <span>Configurações</span>
                </Link>
                <hr className={styles.divider} />
                <button
                  onClick={handleLogout}
                  className={styles.dropdownItem}
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
      {user && (
        <div className={styles.userInfo}>
          Olá, <strong>{user.name}</strong>
        </div>
      )}
    </header>
  )
}
