import React from 'react'

import Image from 'next/image'

import { Button } from '@/components/ui/button'

import styles from './PageLayout.module.scss'

interface PageLayoutProps {
  title: string
  subtitle?: string
  onAdd?: () => void
  addButtonText?: string
  children: React.ReactNode
}

export function PageLayout({
  title,
  subtitle,
  onAdd,
  addButtonText = 'Adicionar Novo',
  children,
}: PageLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{title}</h1>
          {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
        </div>
        {onAdd && (
          <Button
            onClick={onAdd}
            icon={
              <Image
                src="/img/icons/circle-plus-icon.svg"
                alt=""
                width={20}
                height={20}
              />
            }
          >
            {addButtonText}
          </Button>
        )}
      </div>
      {children}
    </div>
  )
}
