'use client'
import React from 'react'

import { VolunteerProps } from '@/@types/volunteerProps'
import { FilterBar } from '@/components/layout/FilterBar'
import { PageLayout } from '@/components/layout/PageLayout'
import { TableCard } from '@/components/layout/TableCard'
import { ConfirmationModal } from '@/components/ui/ConfirmationModal'
import { DataTable, Column } from '@/components/ui/DataTable'
import { Select } from '@/components/ui/select'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { formatDistanceToNow } from '@/utils/formatters'

import { ModalForm } from './components/ModalForm'
import { STATUS_OPTIONS, COLUMNS } from './constants/volunteers'
import { useVolunteers } from './hooks/useVolunteers'
import styles from './Volunteers.module.scss'

export default function VolunteersPage() {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    volunteerToDelete,
    setVolunteerToDelete,
    isDeleting,
    form,
    filtered,
    loading,
    handleInputChange,
    handleUserSelect,
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
      onAdd={() => setModalOpen(true)}
      addButtonText="Adicionar Voluntário"
    >
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
          onEdit={(row) => console.log('Edit', row)}
          onDelete={handleDeleteClick}
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
      />
    </PageLayout>
  )
}
