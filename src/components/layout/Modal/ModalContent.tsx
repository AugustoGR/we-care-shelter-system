import React from 'react'

import styles from './ModalContent.module.scss'

export function ModalContent({ children }: { children: React.ReactNode }) {
  return <div className={styles.content}>{children}</div>
}
