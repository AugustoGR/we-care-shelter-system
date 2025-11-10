'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useShelterModules } from '@/hooks/useShelterModules'
import { useShelterPermissions } from '@/hooks/useShelterPermissions'

import styles from './Nav.module.scss'

interface NavProps {
  isOpen: boolean
  onClose: () => void
}

export function Nav({ isOpen, onClose }: NavProps) {
  const pathname = usePathname()

  // Extract shelter ID from pathname if present
  const shelterMatch = pathname.match(/\/dashboard\/([^/]+)/)
  const shelterId =
    shelterMatch && shelterMatch[1] !== 'new-shelter' ? shelterMatch[1] : null

  const { isModuleActive } = useShelterModules(shelterId)
  const { isAdmin, userModules } = useShelterPermissions(shelterId || '')

  // Verificar se o usuário é responsável por algum módulo
  const isResponsibleForAnyModule = userModules.responsible.length > 0

  // Don't show nav on login/logon pages
  if (pathname === '/login' || pathname === '/logon' || pathname === '/') {
    return null
  }

  const navItems = [
    {
      name: 'Abrigos',
      icon: '/img/nav/building-icon.svg',
      href: '/',
      alwaysShow: true, // Sempre mostrar - não é um módulo gerenciável
    },
    {
      name: 'Abrigados',
      icon: '/img/nav/users-icon.svg',
      href: shelterId ? `/dashboard/${shelterId}/sheltered` : '#',
      disabled: !shelterId,
      moduleKey: 'people',
    },
    {
      name: 'Recursos',
      icon: '/img/nav/package-icon.svg',
      href: shelterId ? `/dashboard/${shelterId}/resources` : '#',
      disabled: !shelterId,
      moduleKey: 'resources',
    },
    {
      name: 'Voluntários',
      icon: '/img/nav/handshake-icon.svg',
      href: shelterId ? `/dashboard/${shelterId}/volunteers` : '#',
      disabled: !shelterId,
      moduleKey: 'volunteers',
    },
    {
      name: 'Animais',
      icon: '/img/nav/paw-print-icon.svg',
      href: shelterId ? `/dashboard/${shelterId}/sheltered-animals` : '#',
      disabled: !shelterId,
      moduleKey: 'animals',
    },
    {
      name: 'Módulos',
      icon: '/img/nav/toggle-left-icon.svg',
      href: shelterId ? `/dashboard/${shelterId}/modules` : '#',
      disabled: !shelterId,
      showForResponsible: true, // Mostrar para responsáveis de módulos
      adminOnly: true, // E também para admin
    },
    {
      name: 'Gerenciamento',
      icon: '/img/nav/settings-icon.svg',
      href: shelterId ? `/dashboard/${shelterId}/settings` : '#',
      disabled: !shelterId,
      alwaysShow: true, // Sempre mostrar para admins
      adminOnly: true, // Apenas para admin
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

  // Filtrar itens baseado na ativação do módulo
  const filteredNavItems = navItems.filter((item) => {
    // Sempre mostrar itens sem moduleKey ou com alwaysShow
    if (!item.moduleKey || item.alwaysShow) {
      // Se for um item apenas para admin, verificar permissão
      if (item.adminOnly && !isAdmin) {
        // Se também pode mostrar para responsáveis, verificar isso
        if (item.showForResponsible && isResponsibleForAnyModule) {
          return true
        }
        return false
      }
      return true
    }

    // Verificar se o módulo está ativo
    return isModuleActive(item.moduleKey)
  })

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      {/* Sidebar */}
      <aside className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
        <div className={styles.navContainer}>
          <nav className={styles.navMenu}>
            {filteredNavItems.map((item) => {
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
