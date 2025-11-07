'use client'
import React from 'react'

import { useParams } from 'next/navigation'

import { VolunteerProps } from '@/@types/volunteerProps'
import { FilterBar } from '@/components/layout/FilterBar'
import { PageLayout } from '@/components/layout/PageLayout'
import { TableCard } from '@/components/layout/TableCard'
import { ConfirmationModal } from '@/components/ui/ConfirmationModal'
import { DataTable, Column } from '@/components/ui/DataTable'
import { Select } from '@/components/ui/select'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { usePermissions, useShelterPermissions } from '@/hooks'
import { formatDistanceToNow } from '@/utils/formatters'

import { ModalForm } from './components/ModalForm'
import { STATUS_OPTIONS, COLUMNS } from './constants/volunteers'
import { useVolunteers } from './hooks/useVolunteers'
import styles from './Volunteers.module.scss'

export default function VolunteersPage() {
  const params = useParams()
  const shelterId = params.shelter as string
  const { modules: permissionModules, isAdmin } = useShelterPermissions(shelterId)
  const { canWriteInModule } = usePermissions()

  // Admin pode editar tudo, caso contrário verifica permissão no módulo
  const userCanWrite = isAdmin || canWriteInModule('volunteers', permissionModules)
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    isEditMode,
    volunteerToDelete,
    setVolunteerToDelete,
    isDeleting,
    isSubmitting,
    form,
    filtered,
    loading,
    handleInputChange,
    handleUserSelect,
    handleEdit,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    clearFilters,
  } = useVolunteers()

  // Adicionar renderização JSX para as colunas especiais
  const columns: Column<VolunteerProps>[] = COLUMNS.map((col) => {
    if (col.header === 'Habilidades') {
      return {
        ...col,
        accessor: (row: VolunteerProps) => (
          <div className={styles.skillsCell}>
            {row.skills.map((skill, idx) => (
              <span key={idx} className={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        ),
      }
    }
    if (col.header === 'Status') {
      return {
        ...col,
        accessor: (row: VolunteerProps) => <StatusBadge status={row.status} />,
      }
    }
    if (col.header === 'Última Atividade') {
      return {
        ...col,
        accessor: (row: VolunteerProps) => formatDistanceToNow(row.lastActivity),
      }
    }
    return col
  })

  if (loading) {
    return (
      <PageLayout
        title="Gestão de Voluntários"
        subtitle="Visualize e gerencie todos os voluntários cadastrados."
      >
        <div>Carregando...</div>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title="Gestão de Voluntários"
      subtitle="Visualize e gerencie todos os voluntários cadastrados."
      onAdd={userCanWrite ? () => setModalOpen(true) : undefined}
      addButtonText="Adicionar Voluntário"
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
          ⚠️ Você não tem permissão para editar voluntários. Apenas
          visualização permitida.
        </div>
      )}

      <FilterBar
        searchValue={search}
        searchPlaceholder="Buscar voluntário..."
        onSearchChange={setSearch}

        filters={
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={STATUS_OPTIONS}
            placeholder="Status"
          />
        }
        onClearFilters={clearFilters}
      />

      <TableCard
        title="Lista de Voluntários"
        subtitle="Gerencie os voluntários registrados e suas informações."
      >
        <DataTable
          data={filtered}
          columns={columns}
          onEdit={userCanWrite ? handleEdit : undefined}
          onDelete={userCanWrite ? handleDeleteClick : undefined}
          emptyMessage="Nenhum voluntário encontrado."
        />
      </TableCard>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setVolunteerToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o voluntário ${volunteerToDelete?.user?.name}?`}
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
        onUserSelect={handleUserSelect}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
        isSubmitting={isSubmitting}
      />
    </PageLayout>
  )
}
