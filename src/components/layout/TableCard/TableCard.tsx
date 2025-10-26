import React from 'react'

import styles from './TableCard.module.scss'

interface TableCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function TableCard({
  title,
  subtitle,
  children,
  actions,
}: TableCardProps) {
  return (
    <div className={styles.tableCard}>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.cardTitle}>{title}</h2>
          {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
        </div>
        {actions && <div className={styles.cardActions}>{actions}</div>}
      </div>
      {children}
    </div>
  )
}
