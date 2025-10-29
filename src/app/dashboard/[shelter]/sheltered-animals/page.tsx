'use client'
import React, { useState } from 'react'

import { FilterBar } from '@/components/layout/FilterBar'
import {
  ModalRoot,
  ModalHeader,
  ModalContent,
  ModalActions,
} from '@/components/layout/Modal'
import { PageLayout } from '@/components/layout/PageLayout'
import { TableCard } from '@/components/layout/TableCard'
import { Button } from '@/components/ui/button'
import { CheckboxGroup } from '@/components/ui/CheckboxGroup'
import { ConfirmationModal } from '@/components/ui/ConfirmationModal'
import { DataTable, Column } from '@/components/ui/DataTable'
import { FileUpload } from '@/components/ui/FileUpload'
import { FormField, FormRow, FormRoot } from '@/components/ui/Form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Textarea } from '@/components/ui/textarea'

import styles from './ShelteredAnimals.module.scss'

interface Animal {
  name: string
  species: string
  breed: string
  age: number
  sex: string
  health: string
  status: string
  photo: string
}

const ANIMALS: Animal[] = [
  {
    name: 'Tobby',
    species: 'Cachorro',
    breed: 'Labrador',
    age: 3,
    sex: 'Macho',
    health: 'Em Cuidado',
    status: 'Em Cuidado',
    photo: '',
  },
  {
    name: 'Mia',
    species: 'Gato',
    breed: 'Siamês',
    age: 1,
    sex: 'Fêmea',
    health: 'Aguardando Adoção',
    status: 'Aguardando Adoção',
    photo: '',
  },
  {
    name: 'Rex',
    species: 'Cachorro',
    breed: 'Pastor Alemão',
    age: 5,
    sex: 'Macho',
    health: 'Em Cuidado',
    status: 'Em Cuidado',
    photo: '',
  },
  {
    name: 'Luna',
    species: 'Gato',
    breed: 'Persa',
    age: 2,
    sex: 'Fêmea',
    health: 'Em Cuidado',
    status: 'Em Cuidado',
    photo: '',
  },
  {
    name: 'Buddy',
    species: 'Cachorro',
    breed: 'Golden Retriever',
    age: 4,
    sex: 'Macho',
    health: 'Adotado',
    status: 'Adotado',
    photo: '',
  },
  {
    name: 'Whiskers',
    species: 'Gato',
    breed: 'Vira-lata',
    age: 7,
    sex: 'Fêmea',
    health: 'Reunido',
    status: 'Reunido',
    photo: '',
  },
]

export default function ShelteredAnimalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    sex: 'Macho',
    health: 'Saudável',
    care: '',
    rabies: false,
    cinomose: false,
    parvo: false,
    felina: false,
    photo: null as File | null,
  })
  const [search, setSearch] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState('')

  const filtered = ANIMALS.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.species.toLowerCase().includes(search.toLowerCase()) ||
      a.breed.toLowerCase().includes(search.toLowerCase())
    const matchSpecies = speciesFilter ? a.species === speciesFilter : true
    return matchSearch && matchSpecies
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', form)
    setIsModalOpen(false)
    setForm({
      name: '',
      species: '',
      breed: '',
      age: '',
      sex: 'Macho',
      health: 'Saudável',
      care: '',
      rabies: false,
      cinomose: false,
      parvo: false,
      felina: false,
      photo: null,
    })
  }

  const handleDeleteClick = (animal: Animal) => {
    setAnimalToDelete(animal)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!animalToDelete) return

    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Deleted:', animalToDelete)
    } catch (error) {
      console.error('Error deleting animal:', error)
    } finally {
      setIsDeleting(false)
      setDeleteModalOpen(false)
      setAnimalToDelete(null)
    }
  }

  const columns: Column<Animal>[] = [
    {
      header: 'Foto',
      accessor: () => <div className={styles.animalPhoto} />,
      width: '80px',
    },
    {
      header: 'Nome',
      accessor: 'name',
      width: '150px',
    },
    {
      header: 'Espécie',
      accessor: 'species',
      width: '120px',
    },
    {
      header: 'Raça',
      accessor: 'breed',
      width: '150px',
    },
    {
      header: 'Idade',
      accessor: 'age',
      width: '100px',
    },
    {
      header: 'Sexo',
      accessor: 'sex',
      width: '100px',
    },
    {
      header: 'Status',
      accessor: (row) => <StatusBadge status={row.status} />,
      width: '150px',
    },
  ]

  return (
    <PageLayout
      title="Gerenciamento de Animais"
      subtitle="Lista completa de animais abrigados e seus status."
      onAdd={() => setIsModalOpen(true)}
      addButtonText="Adicionar Animal"
    >
      <FilterBar
        searchValue={search}
        searchPlaceholder="Buscar por nome, espécie ou raça..."
        onSearchChange={setSearch}

        filters={
          <Select
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            options={[
              { value: 'Cachorro', label: 'Cachorro' },
              { value: 'Gato', label: 'Gato' },
            ]}
            placeholder="Espécie"
          />
        }
        onClearFilters={() => {
          setSearch('')
          setSpeciesFilter('')
        }}
      />

      <TableCard
        title="Animais no Abrigo"
        subtitle="Visualize e gerencie todos os animais cadastrados."
      >
        <DataTable
          data={filtered}
          columns={columns}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={handleDeleteClick}
          emptyMessage="Nenhum animal encontrado."
        />
      </TableCard>

      {/* Modal de confirmação de deleção */}
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

      {/* Modal de cadastro */}
      {isModalOpen && (
        <ModalRoot onClose={() => setIsModalOpen(false)}>
          <ModalHeader
            title="Registrar Novo Animal"
            onClose={() => setIsModalOpen(false)}
          />
          <ModalContent>
            <FormRoot onSubmit={handleSubmit}>
              <p className={styles.formDesc}>
                Preencha os detalhes para adicionar um animal ao abrigo.
              </p>

              <FormRow columns={1}>
                <FormField label="Nome" htmlFor="name" required>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nome do animal"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>
              </FormRow>

              <FormRow>
                <FormField label="Espécie" htmlFor="species" required>
                  <Input
                    id="species"
                    name="species"
                    placeholder="Cachorro, Gato, etc."
                    value={form.species}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>

                <FormField label="Raça" htmlFor="breed">
                  <Input
                    id="breed"
                    name="breed"
                    placeholder="Labrador, Siamês, etc."
                    value={form.breed}
                    onChange={handleInputChange}
                  />
                </FormField>
              </FormRow>

              <FormRow>
                <FormField label="Idade (anos)" htmlFor="age">
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Idade em anos"
                    value={form.age}
                    onChange={handleInputChange}
                  />
                </FormField>

                <FormField label="Sexo" htmlFor="sex" required>
                  <Select
                    id="sex"
                    name="sex"
                    value={form.sex}
                    onChange={handleInputChange}
                    options={[
                      { value: 'Macho', label: 'Macho' },
                      { value: 'Fêmea', label: 'Fêmea' },
                    ]}
                    required
                  />
                </FormField>
              </FormRow>

              <FormRow columns={1}>
                <FormField label="Estado de Saúde" htmlFor="health" required>
                  <Select
                    id="health"
                    name="health"
                    value={form.health}
                    onChange={handleInputChange}
                    options={[
                      { value: 'Saudável', label: 'Saudável' },
                      { value: 'Em Cuidado', label: 'Em Cuidado' },
                      {
                        value: 'Aguardando Adoção',
                        label: 'Aguardando Adoção',
                      },
                      { value: 'Adotado', label: 'Adotado' },
                      { value: 'Reunido', label: 'Reunido' },
                    ]}
                    required
                  />
                </FormField>
              </FormRow>

              <FormRow columns={1}>
                <FormField label="Requisitos de Cuidado" htmlFor="care">
                  <Textarea
                    id="care"
                    name="care"
                    placeholder="Descreva quaisquer necessidades especiais ou requisitos de cuidado."
                    value={form.care}
                    onChange={handleInputChange}
                  />
                </FormField>
              </FormRow>

              <CheckboxGroup
                label="Vacinação"
                options={[
                  {
                    label: 'Raiva',
                    value: 'rabies',
                    checked: form.rabies,
                    onChange: (checked) =>
                      setForm((f) => ({ ...f, rabies: checked })),
                  },
                  {
                    label: 'Cinomose',
                    value: 'cinomose',
                    checked: form.cinomose,
                    onChange: (checked) =>
                      setForm((f) => ({ ...f, cinomose: checked })),
                  },
                  {
                    label: 'Parvovirose',
                    value: 'parvo',
                    checked: form.parvo,
                    onChange: (checked) =>
                      setForm((f) => ({ ...f, parvo: checked })),
                  },
                  {
                    label: 'Felina',
                    value: 'felina',
                    checked: form.felina,
                    onChange: (checked) =>
                      setForm((f) => ({ ...f, felina: checked })),
                  },
                ]}
              />

              <FileUpload
                id="photo-upload"
                label="Foto do Animal"
                description="Envie uma foto clara do animal."
                accept="image/*"
                value={form.photo}
                onChange={(file) => setForm((f) => ({ ...f, photo: file }))}
              />
              <ModalActions>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
              Cancelar
                </Button>
                <Button type="submit" variant="primary">
              Salvar Animal
                </Button>
              </ModalActions>
            </FormRoot>
          </ModalContent>
        </ModalRoot>
      )}
    </PageLayout>
  )
}
