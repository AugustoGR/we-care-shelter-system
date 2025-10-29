'use client'
import React from 'react'

import { FilterBar } from '@/components/layout/FilterBar'
import { PageLayout } from '@/components/layout/PageLayout'
import { TableCard } from '@/components/layout/TableCard'
import { ConfirmationModal } from '@/components/ui/ConfirmationModal'
import { DataTable, Column } from '@/components/ui/DataTable'
import { Select } from '@/components/ui/select'
import { StatusBadge } from '@/components/ui/StatusBadge'

import { ModalForm } from './components/ModalForm'
import {
  type Sheltered,
  STATUS_OPTIONS,
  GENERO_OPTIONS,
  IDADE_OPTIONS,
  PAGE_SIZE,
  COLUMNS,
} from './constants/sheltered'
import { useSheltered } from './hooks/useSheltered'

export default function Sheltered() {
  const {
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    shelteredToDelete,
    setShelteredToDelete,
    isDeleting,
    form,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    generoFilter,
    setGeneroFilter,
    idadeFilter,
    setIdadeFilter,
    currentPage,
    paginatedData,
    totalPages,
    totalItems,
    handlePageChange,
    handleInput,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    clearFilters,
  } = useSheltered()

  // Adicionar renderização JSX para a coluna de status
  const columns: Column<Sheltered>[] = COLUMNS.map((col) => {
    if (col.header === 'Status') {
      return {
        ...col,
        accessor: (row: Sheltered) => <StatusBadge status={row.status} />,
      }
    }
    return col
  })

  return (
    <PageLayout
      title="Gestão de Abrigados"
      subtitle="Visualize e gerencie todos os indivíduos abrigados."
      onAdd={() => setModalOpen(true)}
      addButtonText="Adicionar Novo Abrigado"
    >
      <FilterBar
        searchValue={search}
        searchPlaceholder="Buscar abrigado..."
        onSearchChange={setSearch}

        filters={
          <>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={STATUS_OPTIONS}
              placeholder="Status"
            />
            <Select
              value={generoFilter}
              onChange={(e) => setGeneroFilter(e.target.value)}
              options={GENERO_OPTIONS}
              placeholder="Gênero"
            />
            <Select
              value={idadeFilter}
              onChange={(e) => setIdadeFilter(e.target.value)}
              options={IDADE_OPTIONS}
              placeholder="Idade"
            />
          </>
        }
        onClearFilters={clearFilters}
      />

      <TableCard
        title="Lista de Abrigados"
        subtitle="Gerencie os detalhes de cada indivíduo abrigado."
      >
        <DataTable
          data={paginatedData}
          columns={columns}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={handleDeleteClick}
          emptyMessage="Nenhum abrigado encontrado."
          pagination={{
            currentPage,
            totalPages,
            onPageChange: handlePageChange,
            pageSize: PAGE_SIZE,
            totalItems,
          }}
        />
      </TableCard>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setShelteredToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o abrigado ${shelteredToDelete?.nome}?`}
        confirmText="Excluir"
        confirmButtonStyle={{ backgroundColor: '#E45B63' }}
        isLoading={isDeleting}
        loadingText="Excluindo..."
        showUndoWarning={true}
      />

      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        form={form}
        onInputChange={handleInput}
        onSubmit={handleSubmit}
      />
    </PageLayout>
  )
}
