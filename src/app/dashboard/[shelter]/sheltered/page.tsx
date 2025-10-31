'use client'

import React, { useState } from 'react'

import { FilterBar } from '@/components/layout/FilterBar'
import { PageLayout } from '@/components/layout/PageLayout'
import { TableCard } from '@/components/layout/TableCard'
import { ConfirmationModal } from '@/components/ui/ConfirmationModal'
import { DataTable, Column } from '@/components/ui/DataTable'
import { Select } from '@/components/ui/select'
import { StatusBadge } from '@/components/ui/StatusBadge'

import { ModalForm } from './components/ModalForm'
import {
  type ShelteredPerson,
  PAGE_SIZE,
  COLUMNS,
} from './constants/sheltered'
import { useSheltered } from './hooks/useSheltered'

export default function Sheltered() {
  const {
    sheltered,
    formData,
    selectedSheltered,
    isModalOpen,
    isDeleteModalOpen,
    isEditMode,
    isLoading,
    isSaving,
    error,
    filterStatus,
    filterGenero,
    filterIdade,
    setFilterStatus,
    setFilterGenero,
    setFilterIdade,
    statusOptions,
    generoOptions,
    idadeOptions,
    setIsModalOpen,
    setIsDeleteModalOpen,
    handleAdd,
    handleEdit,
    handleDelete,
    handleDeleteConfirm,
    handleInputChange,
    handleSubmit,
  } = useSheltered()

  const [currentPage, setCurrentPage] = useState(1)

  // Paginação
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const paginatedData = sheltered.slice(startIndex, endIndex)
  const totalPages = Math.ceil(sheltered.length / PAGE_SIZE)

  // Adicionar renderização JSX para a coluna de status
  const columns: Column<ShelteredPerson>[] = COLUMNS.map((col) => {
    if (col.header === 'Status') {
      return {
        ...col,
        accessor: (row: ShelteredPerson) => <StatusBadge status={row.status} />,
      }
    }
    return col
  })

  // Limpar filtros
  const clearFilters = () => {
    setFilterStatus('')
    setFilterGenero('')
    setFilterIdade('')
    setCurrentPage(1)
  }

  return (
    <PageLayout
      title="Gestão de Abrigados"
      subtitle="Visualize e gerencie todos os indivíduos abrigados."
      onAdd={handleAdd}
      addButtonText="Adicionar Novo Abrigado"
    >
      {error && (
        <div
          style={{
            padding: '12px',
            marginBottom: '16px',
            backgroundColor: '#FEE',
            border: '1px solid #FCC',
            borderRadius: '8px',
            color: '#C00',
          }}
        >
          {error}
        </div>
      )}

      <FilterBar
        searchValue=""
        searchPlaceholder="Buscar abrigado..."
        onSearchChange={() => {}}
        filters={
          <>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={statusOptions}
              placeholder="Status"
            />
            <Select
              value={filterGenero}
              onChange={(e) => setFilterGenero(e.target.value)}
              options={generoOptions}
              placeholder="Gênero"
            />
            <Select
              value={filterIdade}
              onChange={(e) => setFilterIdade(e.target.value)}
              options={idadeOptions}
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
        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            Carregando...
          </div>
        ) : (
          <DataTable
            data={paginatedData}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            emptyMessage="Nenhum abrigado encontrado."
            pagination={{
              currentPage,
              totalPages,
              onPageChange: setCurrentPage,
              pageSize: PAGE_SIZE,
              totalItems: sheltered.length,
            }}
          />
        )}
      </TableCard>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o abrigado ${selectedSheltered?.nome}?`}
        confirmText="Excluir"
        confirmButtonStyle={{ backgroundColor: '#E45B63' }}
        isLoading={isSaving}
        loadingText="Excluindo..."
        showUndoWarning={true}
      />

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        form={{
          nome: formData.nome || '',
          cpf: formData.cpf || '',
          dataNascimento: formData.dataNascimento || '',
          genero: formData.genero || '',
          status: formData.status || 'Ativo',
        }}
        onInputChange={(field, value) =>
          handleInputChange(field as keyof typeof formData, value)
        }
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
        isSaving={isSaving}
      />
    </PageLayout>
  )
}
