import React from 'react'

import styles from './FormField.module.scss'

interface FormFieldProps {
  label: string
  children: React.ReactNode
  required?: boolean
  error?: string
  htmlFor?: string
}

export function FormField({
  label,
  children,
  required,
  error,
  htmlFor,
}: FormFieldProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={htmlFor} className={styles.formLabel}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
