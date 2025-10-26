import React from 'react'

import styles from './Pagination.module.scss'

export interface PaginationConfig {
  currentPage: number
  totalPages: number
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void
  pageSize?: number
  totalItems?: number
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalItems,
}: PaginationConfig) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Mostrar todas as páginas se forem poucas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Sempre mostrar primeira página
      pages.push(1)

      // Calcular páginas intermediárias
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adicionar reticências se necessário
      if (startPage > 2) {
        pages.push('...')
      }

      // Adicionar páginas intermediárias
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Adicionar reticências se necessário
      if (endPage < totalPages - 1) {
        pages.push('...')
      }

      // Sempre mostrar última página
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const startItem = (currentPage - 1) * (pageSize || 10) + 1
  const endItem = Math.min(currentPage * (pageSize || 10), totalItems || 0)

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.paginationInfo}>
        {totalItems && pageSize && (
          <span className={styles.paginationText}>
            Mostrando {startItem} - {endItem} de {totalItems} resultados
          </span>
        )}
      </div>

      <div className={styles.paginationControls}>
        <button
          className={styles.paginationButton}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          title="Página anterior"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.buttonText}>Anterior</span>
        </button>

        <div className={styles.pageNumbers}>
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  ...
                </span>
              )
            }

            return (
              <button
                key={page}
                className={`${styles.paginationButton} ${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </button>
            )
          })}
        </div>

        <button
          className={styles.paginationButton}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          title="Próxima página"
        >
          <span className={styles.buttonText}>Próximo</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12l4-4-4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
