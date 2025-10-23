import React from 'react'

import style from './ModalHeader.module.scss'

interface ModalHeaderProps {
  children?: React.ReactNode
  title: string
}

export function ModalHeader({ children, title }: ModalHeaderProps) {
  return (
    <div className={style.header}>
      <pre className={style.title}>{title}</pre>
      {children}
    </div>
  )
}
