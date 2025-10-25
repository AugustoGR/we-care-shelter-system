'use client'
import React, { useEffect } from 'react'

import { useModal } from './hooks/useModal'
import style from './ModalRoot.module.scss'

interface ModalRootProps {
  children: React.ReactNode
  onClose?: () => void
}

export function ModalRoot({ children, onClose }: ModalRootProps) {
  const { testHook } = useModal()

  useEffect(() => {
    testHook()

    // Bloqueia scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden'

    // Cleanup: restaura scroll quando modal fecha
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [testHook])

  // Fecha modal ao clicar no overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose()
    }
  }

  // Fecha modal ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div className={style.container} onClick={handleOverlayClick}>
      <div className={style.wrapper}>{children}</div>
    </div>
  )
}
