'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { InvitationResponse, VolunteerInvitationProps } from '@/@types'
import { useAuth } from '@/contexts/AuthContext'
import { volunteerInvitationsService } from '@/services'

import { UserProfileModal, NotificationModal } from './components'
import styles from './Header.module.scss'

interface HeaderProps {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [profileModalOpen, setProfileModalOpen] = React.useState(false)
  const [profileModalMode, setProfileModalMode] = React.useState<'view' | 'edit'>('view')
  const [notificationModalOpen, setNotificationModalOpen] = React.useState(false)
  const [invitations, setInvitations] = React.useState<VolunteerInvitationProps[]>([])
  const [isResponding, setIsResponding] = React.useState(false)

  // Carregar convites pendentes
  const loadInvitations = React.useCallback(async () => {
    try {
      const data = await volunteerInvitationsService.getMyInvitations()
      setInvitations(data)
    } catch (error) {
      console.error('Error loading invitations:', error)
    }
  }, [])

  React.useEffect(() => {
    loadInvitations()
    // Recarregar convites a cada 30 segundos
    const interval = setInterval(loadInvitations, 30000)
    return () => clearInterval(interval)
  }, [loadInvitations])

  const handleNotificationClick = () => {
    setNotificationModalOpen(true)
  }

  const handleRespondInvitation = async (
    invitationId: string,
    response: InvitationResponse
  ) => {
    setIsResponding(true)
    try {
      await volunteerInvitationsService.respond(invitationId, { response })
      await loadInvitations()
      setNotificationModalOpen(false)

      // Se o convite foi aceito, recarregar a página para atualizar a lista de abrigos
      if (response === InvitationResponse.ACCEPTED) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error responding to invitation:', error)
    } finally {
      setIsResponding(false)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  const handleOpenProfile = (mode: 'view' | 'edit') => {
    setProfileModalMode(mode)
    setProfileModalOpen(true)
    setIsMenuOpen(false)
  }

  const handleCloseProfile = () => {
    setProfileModalOpen(false)
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
            <button
              className={styles.notificationBtn}
              onClick={handleNotificationClick}
            >
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
              {invitations.length > 0 && (
                <span className={styles.badge}>{invitations.length}</span>
              )}
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
                <button
                  onClick={() => handleOpenProfile('view')}
                  className={styles.dropdownItem}
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  <Image
                    src="/img/user-icon.svg"
                    alt="Profile"
                    width={18}
                    height={18}
                  />
                  <span>Meu Perfil</span>
                </button>
                <button
                  onClick={() => handleOpenProfile('edit')}
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
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6m-7.07-3.07l4.24 4.24m4.24-4.24l4.24 4.24M1 12h6m6 0h6m-3.07-7.07l4.24 4.24M7.76 7.76l4.24 4.24" />
                  </svg>
                  <span>Configurações</span>
                </button>
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

            <UserProfileModal
              isOpen={profileModalOpen}
              onClose={handleCloseProfile}
              mode={profileModalMode}
            />

            <NotificationModal
              isOpen={notificationModalOpen}
              onClose={() => setNotificationModalOpen(false)}
              invitations={invitations}
              onRespond={handleRespondInvitation}
              isResponding={isResponding}
            />
          </div>
        </nav>
      </div>
    </header>
  )
}
