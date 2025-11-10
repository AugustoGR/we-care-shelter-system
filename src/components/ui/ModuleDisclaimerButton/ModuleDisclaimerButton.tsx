import React from 'react'

import styles from './ModuleDisclaimerButton.module.scss'

interface ModuleDisclaimerButtonProps {
  onClick: () => void
  className?: string
}

export function ModuleDisclaimerButton({
  onClick,
  className,
}: ModuleDisclaimerButtonProps) {
  return (
    <button
      className={`${styles.disclaimerBtn} ${className || ''}`}
      onClick={onClick}
      title="Ver informações sobre permissões do módulo"
      type="button"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    </button>
  )
}
