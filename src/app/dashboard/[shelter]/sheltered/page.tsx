'use client'

import React from 'react'

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
import { CheckoutModal, ModalForm } from './components'
import { type ShelteredPerson, COLUMNS } from './constants/sheltered'
import { useSheltered } from './hooks/useSheltered'
import styles from './Sheltered.module.scss'

export default function Sheltered() {
  const { getModuleData } = useModules()
  const {
    paginatedData,
    formData,
    selectedSheltered,
    user,
    isAdmin,
    userCanWrite,
    isDisclaimerOpen,
    disclaimerModule,
    openDisclaimer,
    closeDisclaimer,
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    sheltered,
    isModalOpen,
    isDeleteModalOpen,
    isEditMode,
    isLoading,
    isSaving,
    error,
    filterStatus,
    filterGenero,
    filterIdade,
    searchValue,
    setFilterStatus,
    setFilterGenero,
    setFilterIdade,
    setSearchValue,
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
    handleClearFilters,
    checkoutModalOpen,
    setCheckoutModalOpen,
    isCheckingOut,
    handleCheckout,
  } = useSheltered()

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

  return (
    <>
      <PageLayout
        title="Gestão de Abrigados"
        subtitle="Visualize e gerencie todos os indivíduos abrigados."
        onAdd={userCanWrite ? handleAdd : undefined}
        addButtonText="Adicionar Novo Abrigado"
        disclaimerButton={
          <ModuleDisclaimerButton
            onClick={() => openDisclaimer(MODULE_INFO.people)}
          />
        }
      >
        {error && <div className={styles.errorBanner}>{error}</div>}

        {!userCanWrite && (
          <div className={styles.noPermissionBanner}>
            ⚠️ Você não tem permissão para editar abrigados. Apenas
            visualização permitida.
          </div>
        )}

        <FilterBar
          searchValue={searchValue}
          searchPlaceholder="Buscar abrigado..."
          onSearchChange={(value) => {
            setSearchValue(value)
            setCurrentPage(1) // Reset para primeira página ao buscar
          }}
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
          onClearFilters={handleClearFilters}
        />

        {userCanWrite && paginatedData.length > 0 && (
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="secondary"
              onClick={() => setCheckoutModalOpen(true)}
            >
              Fazer Checkout
            </Button>
          </div>
        )}

        <TableCard
          title="Lista de Abrigados"
          subtitle="Gerencie os detalhes de cada indivíduo abrigado."
        >
          {isLoading ? (
            <div className={styles.loadingContainer}>Carregando...</div>
          ) : (
            <DataTable
              data={paginatedData}
              columns={columns}
              onEdit={userCanWrite ? handleEdit : undefined}
              onDelete={userCanWrite ? handleDelete : undefined}
              emptyMessage="Nenhum abrigado encontrado."
              pagination={{
                currentPage,
                totalPages,
                onPageChange: setCurrentPage,
                pageSize,
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

        {disclaimerModule && (
          <ModuleDisclaimerModal
            isOpen={isDisclaimerOpen}
            onClose={closeDisclaimer}
            module={disclaimerModule}
            responsibleName={
              getModuleData('people')?.responsibleVolunteer?.user?.name ||
            'Admin'
            }
            adminName={user?.name || 'Administrador'}
            isUserAdmin={isAdmin}
            isUserResponsible={
              getModuleData('people')?.responsibleVolunteer?.user?.id === user?.id
            }
            isUserAssociated={
              getModuleData('people')?.associatedVolunteers?.some(
                (v) => v.volunteer.user.id === user?.id,
              ) || false
            }
          />
        )}

        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          people={sheltered}
          onConfirm={handleCheckout}
          isLoading={isCheckingOut}
        />
      </PageLayout>
    </>
  )
}
