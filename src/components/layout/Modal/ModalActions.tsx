import React from 'react'

import styles from './ModalActions.module.scss'

interface ModalActionsProps {
  children: React.ReactNode
}

export function ModalActions({ children }: ModalActionsProps) {
  return <div className={styles.modalActions}>{children}</div>
}
