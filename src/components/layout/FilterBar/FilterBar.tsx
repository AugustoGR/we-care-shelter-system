import React from 'react'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import styles from './FilterBar.module.scss'

interface FilterBarProps {
  searchValue: string
  searchPlaceholder?: string
  onSearchChange: (value: string) => void
  filters?: React.ReactNode
  onClearFilters?: () => void
}

export function FilterBar({
  searchValue,
  searchPlaceholder = 'Buscar...',
  onSearchChange,
  filters,
  onClearFilters,
}: FilterBarProps) {
  return (
    <div className={styles.filtersRow}>
      <div className={styles.searchBox}>
        <Input
          type="text"
          placeholder={searchPlaceholder}
          className={styles.searchInput}
          icon="/img/icons/search-icon.svg"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {filters}

      {onClearFilters && (
        <Button
          variant="secondary"
          onClick={onClearFilters}
          icon={
            <Image
              src="/img/icons/circle-x-icon.svg"
              alt=""
              width={16}
              height={16}
            />
          }
        >
          Limpar Filtros
        </Button>
      )}
    </div>
  )
}
