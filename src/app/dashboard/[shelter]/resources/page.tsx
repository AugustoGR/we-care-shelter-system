'use client'
import React from 'react'

import { ResourceProps } from '@/@types'
import { FilterBar } from '@/components/layout/FilterBar'
import { PageLayout } from '@/components/layout/PageLayout'
import { TableCard } from '@/components/layout/TableCard'
import { ModuleDisclaimerModal } from '@/components/modules'
import { Button } from '@/components/ui/button'
import { ConfirmationModal } from '@/components/ui/ConfirmationModal'
import { DataTable, Column } from '@/components/ui/DataTable'
import { ModuleDisclaimerButton } from '@/components/ui/ModuleDisclaimerButton'
import { Select } from '@/components/ui/select'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { MODULE_INFO } from '@/constants/modules'

import { useModules } from '../modules/hooks/useModules'
import { ModalForm, WithdrawModal } from './components'
import { CATEGORIAS, COLUMNS } from './constants/resources'
import { useResources } from './hooks/useResources'
import styles from './Resources.module.scss'

export default function Resources() {
  const { getModuleData } = useModules()

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
    userCanWrite,
    isAdmin,
    user,
    isDisclaimerOpen,
    disclaimerModule,
    openDisclaimer,
    closeDisclaimer,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDeleteClick,
    handleDeleteConfirm,
    clearFilters,
    withdrawModalOpen,
    setWithdrawModalOpen,
    isWithdrawing,
    handleWithdraw,
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
    <>
      <PageLayout
        title="Gerenciamento de Recursos"
        subtitle="Gerencie o inventário de recursos e controle de estoque."
        onAdd={userCanWrite ? () => setModalOpen(true) : undefined}
        addButtonText="Adicionar Recurso"
        disclaimerButton={
          <ModuleDisclaimerButton
            onClick={() => openDisclaimer(MODULE_INFO.resources)}
          />
        }
      >
        {!userCanWrite && (
          <div className={styles.noPermissionBanner}>
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
          onClearFilters={clearFilters}
        />

        {userCanWrite && filteredResources.length > 0 && (
          <div className={styles.actionButtons}>
            <Button
              onClick={() => setWithdrawModalOpen(true)}
              variant="secondary"
            >
              Dar Baixa em Recurso
            </Button>
          </div>
        )}

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

        <WithdrawModal
          isOpen={withdrawModalOpen}
          onClose={() => setWithdrawModalOpen(false)}
          resources={filteredResources}
          onConfirm={handleWithdraw}
          isLoading={isWithdrawing}
        />

        {disclaimerModule && (
          <ModuleDisclaimerModal
            isOpen={isDisclaimerOpen}
            onClose={closeDisclaimer}
            module={disclaimerModule}
            responsibleName={
              getModuleData('resources')?.responsibleVolunteer?.user?.name ||
            'Admin'
            }
            adminName={user?.name || 'Administrador'}
            isUserAdmin={isAdmin}
            isUserResponsible={
              getModuleData('resources')?.responsibleVolunteer?.user?.id ===
            user?.id
            }
            isUserAssociated={
              getModuleData('resources')?.associatedVolunteers?.some(
                (v) => v.volunteer.user.id === user?.id,
              ) || false
            }
          />
        )}
      </PageLayout>
    </>
  )
}
