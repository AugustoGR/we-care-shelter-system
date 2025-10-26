import React from 'react'

import styles from './StatusBadge.module.scss'

interface StatusBadgeProps {
  status: string
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default'
}

const variantMap: Record<string, string> = {
  // Abrigados
  Ativo: 'success',
  Inativo: 'danger',
  Pendente: 'warning',
  // Voluntários
  Ausente: 'info',
  // Recursos
  'Em Estoque': 'success',
  'Estoque Baixo': 'warning',
  Vencido: 'danger',
  // Animais
  Saudável: 'success',
  'Em Tratamento': 'warning',
  Crítico: 'danger',
  Adotado: 'info',
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const resolvedVariant = variant || variantMap[status] || 'default'

  return (
    <span className={`${styles.badge} ${styles[resolvedVariant]}`}>
      {status}
    </span>
  )
}
