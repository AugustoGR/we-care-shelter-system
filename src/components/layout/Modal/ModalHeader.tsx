import React from 'react'

import Image from 'next/image'

import style from './ModalHeader.module.scss'

interface ModalHeaderProps {
  children?: React.ReactNode
  title: string
  onClose?: () => void
}

export function ModalHeader({ children, title, onClose }: ModalHeaderProps) {
  return (
    <div className={style.header}>
      <h2 className={style.title}>{title}</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {children}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={style.closeButton}
            aria-label="Fechar"
          >
            <Image
              src="/img/icons/circle-x-icon.svg"
              alt="Fechar"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
    </div>
  )
}
