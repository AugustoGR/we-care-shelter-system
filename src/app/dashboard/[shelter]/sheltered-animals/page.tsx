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

import { CheckoutModal, ModalForm, PhotoModal } from './components'
import { type Animal, SPECIES_OPTIONS, COLUMNS } from './constants/animals'
import { useShelteredAnimals } from './hooks/useShelteredAnimals'
import styles from './ShelteredAnimals.module.scss'

export default function ShelteredAnimalsPage() {
  const {
    user,
    isAdmin,
    userCanWrite,
    isDisclaimerOpen,
    disclaimerModule,
    openDisclaimer,
    closeDisclaimer,
    getModuleData,
    isModalOpen,
    setIsModalOpen,
    isEditMode,
    deleteModalOpen,
    setDeleteModalOpen,
    animalToDelete,
    setAnimalToDelete,
    photoModalOpen,
    selectedPhoto,
    isDeleting,
    isLoading,
    isSaving,
    error,
    form,
    search,
    setSearch,
    speciesFilter,
    setSpeciesFilter,
    filtered,
    animals,
    checkoutModalOpen,
    setCheckoutModalOpen,
    isCheckingOut,
    handleInputChange,
    handleEdit,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCheckboxChange,
    handleFileChange,
    handlePhotoClick,
    closePhotoModal,
    clearFilters,
    handleCheckout,
  } = useShelteredAnimals()

  // Adicionar renderização JSX para as colunas especiais
  const columns: Column<Animal>[] = COLUMNS.map((col) => {
    if (col.header === 'Foto') {
      return {
        ...col,
        accessor: (row: Animal) => (
          <div
            className={styles.animalPhoto}
            onClick={() => row.photo && handlePhotoClick(row.photo, row.name)}
            role={row.photo ? 'button' : undefined}
            tabIndex={row.photo ? 0 : undefined}
            onKeyDown={(e) => {
              if (row.photo && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                handlePhotoClick(row.photo, row.name)
              }
            }}
            aria-label={row.photo ? `Ver foto de ${row.name}` : undefined}
          >
            {row.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={row.photo}
                alt={row.name}
              />
            ) : (
              <span className={styles.noPhoto}>Sem foto</span>
            )}
          </div>
        ),
      }
    }
    if (col.header === 'Status') {
      return {
        ...col,
        accessor: (row: Animal) => <StatusBadge status={row.status} />,
      }
    }
    if (col.header === 'Idade') {
      return {
        ...col,
        accessor: (row: Animal) => (row.age ? `${row.age} anos` : '-'),
      }
    }
    if (col.header === 'Raça') {
      return {
        ...col,
        accessor: (row: Animal) => row.breed || '-',
      }
    }
    return col
  })

  return (
    <>
      <PageLayout
        title="Gerenciamento de Animais"
        subtitle="Lista completa de animais abrigados e seus status."
        onAdd={userCanWrite ? () => setIsModalOpen(true) : undefined}
        addButtonText="Adicionar Animal"
        disclaimerButton={
          <ModuleDisclaimerButton
            onClick={() => openDisclaimer(MODULE_INFO.animals)}
          />
        }
      >
        {error && <div className={styles.errorBanner}>{error}</div>}

        {!userCanWrite && (
          <div className={styles.noPermissionBanner}>
            ⚠️ Você não tem permissão para editar animais. Apenas visualização
            permitida.
          </div>
        )}

        <FilterBar
          searchValue={search}
          searchPlaceholder="Buscar por nome, espécie ou raça..."
          onSearchChange={setSearch}
          filters={
            <Select
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
              options={SPECIES_OPTIONS}
              placeholder="Espécie"
            />
          }
          onClearFilters={clearFilters}
        />

        {userCanWrite && filtered.length > 0 && (
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
          title="Animais no Abrigo"
          subtitle="Visualize e gerencie todos os animais cadastrados."
        >
          {isLoading ? (
            <div className={styles.loadingContainer}>Carregando animais...</div>
          ) : (
            <DataTable
              data={filtered}
              columns={columns}
              onEdit={userCanWrite ? handleEdit : undefined}
              onDelete={userCanWrite ? handleDeleteClick : undefined}
              emptyMessage="Nenhum animal encontrado."
            />
          )}
        </TableCard>

        <ConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false)
            setAnimalToDelete(null)
          }}
          onConfirm={handleDeleteConfirm}
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir o animal ${animalToDelete?.name}?`}
          confirmText="Excluir"
          confirmButtonStyle={{ backgroundColor: '#E45B63' }}
          isLoading={isDeleting}
          loadingText="Excluindo..."
          showUndoWarning={true}
        />

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          form={form}
          onInputChange={handleInputChange}
          onCheckboxChange={handleCheckboxChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          isSaving={isSaving}
          isEditMode={isEditMode}
        />

        {disclaimerModule && (
          <ModuleDisclaimerModal
            isOpen={isDisclaimerOpen}
            onClose={closeDisclaimer}
            module={disclaimerModule}
            responsibleName={
              getModuleData('animals')?.responsibleVolunteer?.user?.name ||
              'Admin'
            }
            adminName={user?.name || 'Administrador'}
            isUserAdmin={isAdmin}
            isUserResponsible={
              getModuleData('animals')?.responsibleVolunteer?.user?.id ===
              user?.id
            }
            isUserAssociated={
              getModuleData('animals')?.associatedVolunteers?.some(
                (v) => v.volunteer.user.id === user?.id,
              ) || false
            }
          />
        )}

        {selectedPhoto && (
          <PhotoModal
            isOpen={photoModalOpen}
            onClose={closePhotoModal}
            photoUrl={selectedPhoto.url}
            animalName={selectedPhoto.name}
          />
        )}

        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          animals={animals}
          onConfirm={handleCheckout}
          isLoading={isCheckingOut}
        />
      </PageLayout>
    </>
  )
}
