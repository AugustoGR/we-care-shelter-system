'use client'
import React from 'react'

import { VolunteerProps } from '@/@types/volunteerProps'
import { FilterBar } from '@/components/layout/FilterBar'
import { PageLayout } from '@/components/layout/PageLayout'
import { TableCard } from '@/components/layout/TableCard'
import { ModuleDisclaimerModal } from '@/components/modules'
import { ConfirmationModal } from '@/components/ui/ConfirmationModal'
import { DataTable, Column } from '@/components/ui/DataTable'
import { ModuleDisclaimerButton } from '@/components/ui/ModuleDisclaimerButton'
import { Select } from '@/components/ui/select'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { MODULE_INFO } from '@/constants/modules'
import { formatDistanceToNow } from '@/utils/formatters'

import { useModules } from '../modules/hooks/useModules'
import { ModalForm } from './components/ModalForm'
import { STATUS_OPTIONS, COLUMNS } from './constants/volunteers'
import { useVolunteers } from './hooks/useVolunteers'
import styles from './Volunteers.module.scss'

export default function VolunteersPage() {
  const { getModuleData } = useModules()

  const {
    user,
    isAdmin,
    userCanWrite,
    isDisclaimerOpen,
    disclaimerModule,
    openDisclaimer,
    closeDisclaimer,
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
    <>
      <PageLayout
        title="Gestão de Voluntários"
        subtitle="Visualize e gerencie todos os voluntários cadastrados."
        onAdd={userCanWrite ? () => setModalOpen(true) : undefined}
        addButtonText="Adicionar Voluntário"
        disclaimerButton={
          <ModuleDisclaimerButton
            onClick={() => openDisclaimer(MODULE_INFO.volunteers)}
          />
        }
      >
        {!userCanWrite && (
          <div className={styles.noPermissionBanner}>
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

        {disclaimerModule && (
          <ModuleDisclaimerModal
            isOpen={isDisclaimerOpen}
            onClose={closeDisclaimer}
            module={disclaimerModule}
            responsibleName={
              getModuleData('volunteers')?.responsibleVolunteer?.user?.name ||
            'Admin'
            }
            adminName={user?.name || 'Administrador'}
            isUserAdmin={isAdmin}
            isUserResponsible={
              getModuleData('volunteers')?.responsibleVolunteer?.user?.id ===
            user?.id
            }
            isUserAssociated={
              getModuleData('volunteers')?.associatedVolunteers?.some(
                (v) => v.volunteer.user.id === user?.id,
              ) || false
            }
          />
        )}
      </PageLayout>
    </>
  )
}
