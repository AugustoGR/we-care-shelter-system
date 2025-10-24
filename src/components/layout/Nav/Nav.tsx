'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './Nav.module.scss'

interface NavProps {
  isOpen: boolean
  onClose: () => void
}

export function Nav({ isOpen, onClose }: NavProps) {
  const pathname = usePathname()

  // Don't show nav on login/logon pages
  if (pathname === '/login' || pathname === '/logon' || pathname === '/') {
    return null
  }

  // Extract shelter ID from pathname if present
  const shelterMatch = pathname.match(/\/dashboard\/([^\/]+)/)
  const shelterId =
    shelterMatch && shelterMatch[1] !== 'new-shelter' ? shelterMatch[1] : null

  const navItems = [
    {
      name: 'Abrigos',
      icon: '/img/nav/building-icon.svg',
      href: '/',
    },
    {
      name: 'Abrigados',
      icon: '/img/nav/users-icon.svg',
      href: shelterId ? `/dashboard/${shelterId}/sheltered` : '#',
      disabled: !shelterId,
    },
    {
      name: 'Recursos',
      icon: '/img/nav/package-icon.svg',
      href: shelterId ? `/dashboard/${shelterId}/resources` : '#',
      disabled: !shelterId,
    },
    {
      name: 'Voluntários',
      icon: '/img/nav/handshake-icon.svg',
      href: shelterId ? `/dashboard/${shelterId}/volunteers` : '#',
      disabled: !shelterId,
    },
    {
      name: 'Animais',
      icon: '/img/nav/paw-print-icon.svg',
      href: shelterId ? `/dashboard/${shelterId}/sheltered-animals` : '#',
      disabled: !shelterId,
    },
    {
      name: 'Módulos',
      icon: '/img/nav/toggle-left-icon.svg',
      href: shelterId ? `/dashboard/${shelterId}/modules` : '#',
      disabled: !shelterId,
    },
    {
      name: 'Notificações',
      icon: '/img/nav/bell-ring-icon.svg',
      href: '/dashboard/notifications',
      disabled: true,
    },
    {
      name: 'Relatórios',
      icon: '/img/nav/file-text-icon.svg',
      href: '/dashboard/reports',
      disabled: true,
    },
    {
      name: 'Gerenciamento',
      icon: '/img/nav/settings-icon.svg',
      href: '/dashboard/management',
      disabled: true,
    },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    if (href === '#') {
      return false
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      {/* Sidebar */}
      <aside className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
        <div className={styles.navContainer}>
          <nav className={styles.navMenu}>
            {navItems.map((item) => {
              const isDisabled = item.disabled || false

              if (isDisabled) {
                return (
                  <div
                    key={item.name}
                    className={`${styles.navItem} ${styles.navItemDisabled}`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={20}
                      height={20}
                      className={styles.navIcon}
                    />
                    <span className={styles.navText}>{item.name}</span>
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${styles.navItem} ${isActive(item.href) ? styles.navItemActive : ''}`}
                  onClick={onClose}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className={styles.navIcon}
                  />
                  <span className={styles.navText}>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
