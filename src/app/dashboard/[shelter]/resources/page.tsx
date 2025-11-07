'use client'
import React from 'react'

import { useParams } from 'next/navigation'

import { ResourceProps } from '@/@types'
import { FilterBar } from '@/components/layout/FilterBar'
import { PageLayout } from '@/components/layout/PageLayout'
import { TableCard } from '@/components/layout/TableCard'
import { ConfirmationModal } from '@/components/ui/ConfirmationModal'
import { DataTable, Column } from '@/components/ui/DataTable'
import { Select } from '@/components/ui/select'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { usePermissions, useShelterPermissions } from '@/hooks'

import { ModalForm } from './components/ModalForm'
import { CATEGORIAS, COLUMNS } from './constants/resources'
import { useResources } from './hooks/useResources'

export default function Resources() {
  const params = useParams()
  const shelterId = params.shelter as string
  const { modules: permissionModules, isAdmin } = useShelterPermissions(shelterId)
  const { canWriteInModule } = usePermissions()

  // Admin pode editar tudo, caso contrário verifica permissão no módulo
  const userCanWrite = isAdmin || canWriteInModule('resources', permissionModules)
  const {
    search,
    setSearch,
    categoriaFiltro,
    setCategoriaFiltro,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    isEditMode,
    resourceToDelete,
    setResourceToDelete,
    isDeleting,
    isSubmitting,
    form,
    filteredResources,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDeleteClick,
    handleDeleteConfirm,
  } = useResources()

  // Adicionar renderização JSX para a coluna de status
  const columns: Column<ResourceProps>[] = COLUMNS.map((col) => {
    if (col.header === 'Status') {
      return {
        ...col,
        accessor: (row: ResourceProps) => <StatusBadge status={row.status} />,
      }
    }
    return col
  })

  return (
    <PageLayout
      title="Gerenciamento de Recursos"
      subtitle="Gerencie o inventário de recursos e controle de estoque."
      onAdd={userCanWrite ? () => setModalOpen(true) : undefined}
      addButtonText="Adicionar Recurso"
    >
      {!userCanWrite && (
        <div
          style={{
            padding: '12px',
            marginBottom: '16px',
            backgroundColor: '#FFF8E1',
            border: '1px solid #FFD54F',
            borderRadius: '8px',
            color: '#F57F17',
          }}
        >
          ⚠️ Você não tem permissão para editar recursos. Apenas visualização
          permitida.
        </div>
      )}

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
          onEdit={userCanWrite ? handleEdit : undefined}
          onDelete={userCanWrite ? handleDeleteClick : undefined}
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
        isSubmitting={isSubmitting}
        isEditMode={isEditMode}
      />
    </PageLayout>
  )
}
