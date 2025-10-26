import React from 'react'

import styles from './FormRow.module.scss'

interface FormRowProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3
}

export function FormRow({ children, columns = 2 }: FormRowProps) {
  return (
    <div className={styles.formRow} data-columns={columns}>
      {children}
    </div>
  )
}
