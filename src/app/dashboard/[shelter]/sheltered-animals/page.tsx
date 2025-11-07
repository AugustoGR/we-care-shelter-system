'use client'
import React from 'react'

import { useParams } from 'next/navigation'

import { FilterBar } from '@/components/layout/FilterBar'
import { PageLayout } from '@/components/layout/PageLayout'
import { TableCard } from '@/components/layout/TableCard'
import { ConfirmationModal } from '@/components/ui/ConfirmationModal'
import { DataTable, Column } from '@/components/ui/DataTable'
import { Select } from '@/components/ui/select'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { usePermissions, useShelterPermissions } from '@/hooks'

import { ModalForm } from './components/ModalForm'
import { type Animal, SPECIES_OPTIONS, COLUMNS } from './constants/animals'
import { useShelteredAnimals } from './hooks/useShelteredAnimals'
import styles from './ShelteredAnimals.module.scss'

export default function ShelteredAnimalsPage() {
  const params = useParams()
  const shelterId = params.shelter as string
  const { modules: permissionModules, isAdmin } = useShelterPermissions(shelterId)
  const { canWriteInModule } = usePermissions()

  // Admin pode editar tudo, caso contrário verifica permissão no módulo
  const userCanWrite = isAdmin || canWriteInModule('animals', permissionModules)
  const {
    isModalOpen,
    setIsModalOpen,
    isEditMode,
    deleteModalOpen,
    setDeleteModalOpen,
    animalToDelete,
    setAnimalToDelete,
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
    handleInputChange,
    handleEdit,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCheckboxChange,
    handleFileChange,
    clearFilters,
  } = useShelteredAnimals()

  // Adicionar renderização JSX para as colunas especiais
  const columns: Column<Animal>[] = COLUMNS.map((col) => {
    if (col.header === 'Foto') {
      return {
        ...col,
        accessor: () => <div className={styles.animalPhoto} />,
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
    <PageLayout
      title="Gerenciamento de Animais"
      subtitle="Lista completa de animais abrigados e seus status."
      onAdd={userCanWrite ? () => setIsModalOpen(true) : undefined}
      addButtonText="Adicionar Animal"
    >
      {error && (
        <div
          style={{
            padding: '1rem',
            marginBottom: '1rem',
            backgroundColor: '#fee',
            color: '#c00',
            borderRadius: '4px',
          }}
        >
          {error}
        </div>
      )}

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

      <TableCard
        title="Animais no Abrigo"
        subtitle="Visualize e gerencie todos os animais cadastrados."
      >
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            Carregando animais...
          </div>
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
    </PageLayout>
  )
}
