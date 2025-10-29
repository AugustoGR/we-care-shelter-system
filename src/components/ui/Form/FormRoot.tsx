import React from 'react'

import styles from './FormRoot.module.scss'

interface FormRootProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

export function FormRoot({ children, className, ...props }: FormRootProps) {
  return (
    <form className={`${styles.form} ${className || ''}`} {...props}>
      {children}
    </form>
  )
}
