import React from 'react'

import Image from 'next/image'

import { Pagination, PaginationConfig } from '@/components/ui/Pagination'

import styles from './DataTable.module.scss'

export interface Column<T> {
  header: string
  // eslint-disable-next-line no-unused-vars
  accessor: keyof T | ((row: T) => React.ReactNode)
  width?: string
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
}

export type { PaginationConfig }

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  // eslint-disable-next-line no-unused-vars
  onEdit?: (row: T, index: number) => void
  // eslint-disable-next-line no-unused-vars
  onDelete?: (row: T, index: number) => void
  emptyMessage?: string
  pagination?: PaginationConfig
}

export function DataTable<T>({
  data,
  columns,
  onEdit,
  onDelete,
  emptyMessage = 'Nenhum registro encontrado.',
  pagination,
}: DataTableProps<T>) {
  const getCellValue = (row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row)
    }
    return row[column.accessor] as React.ReactNode
  }

  const hasActions = onEdit || onDelete

  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{
                    width: column.width,
                    textAlign: column.headerAlign || 'left',
                  }}
                >
                  {column.header}
                </th>
              ))}
              {hasActions && (
                <th
                  className={styles.actionsHeader}
                  style={{ width: '149px' }}
                >
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className={styles.emptyCell}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      style={{ textAlign: column.align || 'left' }}
                    >
                      {getCellValue(row, column)}
                    </td>
                  ))}
                  {hasActions && (
                    <td className={styles.actionsCell}>
                      {onEdit && (
                        <button
                          className={styles.actionButton}
                          onClick={() => onEdit(row, rowIndex)}
                          title="Editar"
                        >
                          <Image
                            src="/img/icons/square-pen-icon.svg"
                            alt="Editar"
                            width={16}
                            height={16}
                          />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className={styles.actionButton}
                          onClick={() => onDelete(row, rowIndex)}
                          title="Excluir"
                        >
                          <Image
                            src="/img/icons/trash-icon.svg"
                            alt="Excluir"
                            width={16}
                            height={16}
                          />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && <Pagination {...pagination} />}
    </>
  )
}
