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
import { CATEGORIAS, COLUMNS, Resource } from './constants/resources'
import { useResources } from './hooks/useResources'

export default function Resources() {
  const {
    search,
    setSearch,
    categoriaFiltro,
    setCategoriaFiltro,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    resourceToDelete,
    setResourceToDelete,
    isDeleting,
    form,
    filteredResources,
    handleInputChange,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
  } = useResources()

  // Adicionar renderização JSX para a coluna de status
  const columns: Column<Resource>[] = COLUMNS.map((col) => {
    if (col.header === 'Status') {
      return {
        ...col,
        accessor: (row: Resource) => <StatusBadge status={row.status} />,
      }
    }
    return col
  })

  return (
    <PageLayout
      title="Gerenciamento de Recursos"
      subtitle="Gerencie o inventário de recursos e controle de estoque."
      onAdd={() => setModalOpen(true)}
      addButtonText="Adicionar Recurso"
    >
      <FilterBar
        searchValue={search}
        searchPlaceholder="Buscar recurso..."
        onSearchChange={setSearch}

        filters={
          <Select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            options={CATEGORIAS.map((cat) => ({ value: cat, label: cat }))}
            placeholder="Categoria"
          />
        }
        onClearFilters={() => {
          setSearch('')
          setCategoriaFiltro('')
        }}
      />

      <TableCard
        title="Inventário Detalhado"
        subtitle="Controle de estoque e validade dos recursos cadastrados."
      >
        <DataTable
          data={filteredResources}
          columns={columns}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={handleDeleteClick}
          emptyMessage="Nenhum recurso encontrado."
        />
      </TableCard>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setResourceToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o recurso ${resourceToDelete?.nome}?`}
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
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </PageLayout>
  )
}
