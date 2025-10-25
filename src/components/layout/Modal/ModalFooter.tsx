import React from 'react'

import styles from './ModalFooter.module.scss'

interface ModalFooterProps {
  children: React.ReactNode
}

export function ModalFooter({ children }: ModalFooterProps) {
  return <div className={styles.footer}>{children}</div>
}
