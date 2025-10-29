'use client'
import React, { useState } from 'react'

import { FilterBar } from '@/components/layout/FilterBar'
import {
  ModalContent,
  ModalHeader,
  ModalRoot,
  ModalActions,
} from '@/components/layout/Modal'
import { PageLayout } from '@/components/layout/PageLayout'
import { TableCard } from '@/components/layout/TableCard'
import { Button } from '@/components/ui/button'
import { ConfirmationModal } from '@/components/ui/ConfirmationModal'
import { DataTable, Column } from '@/components/ui/DataTable'
import { FormField, FormRow, FormRoot } from '@/components/ui/Form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { StatusBadge } from '@/components/ui/StatusBadge'

// eslint-disable-next-line no-unused-vars
interface Sheltered {
  nome: string
  cpf: string
  genero: string
  dataNascimento: string
  status: string
}

const initialForm = {
  nome: '',
  cpf: '',
  genero: '',
  dataNascimento: '',
  status: 'Ativo',
}

export default function Sheltered() {
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [shelteredToDelete, setShelteredToDelete] = useState<Sheltered | null>(
    null,
  )
  const [isDeleting, setIsDeleting] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [generoFilter, setGeneroFilter] = useState('')
  const [idadeFilter, setIdadeFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sheltered, setSheltered] = useState<Sheltered[]>([
    {
      nome: 'João Silva',
      cpf: '123.456.789-00',
      genero: 'Masculino',
      dataNascimento: '15/05/1988',
      status: 'Ativo',
    },
    {
      nome: 'Maria Oliveira',
      cpf: '987.654.321-00',
      genero: 'Feminino',
      dataNascimento: '22/11/1992',
      status: 'Ativo',
    },
    {
      nome: 'Carlos Pereira',
      cpf: '111.222.333-44',
      genero: 'Masculino',
      dataNascimento: '01/03/1975',
      status: 'Inativo',
    },
    {
      nome: 'Ana Souza',
      cpf: '555.666.777-88',
      genero: 'Feminino',
      dataNascimento: '30/07/2000',
      status: 'Pendente',
    },
    {
      nome: 'Pedro Lima',
      cpf: '444.333.222-11',
      genero: 'Masculino',
      dataNascimento: '10/01/1965',
      status: 'Ativo',
    },
  ])

  // Filtros
  const filtered = sheltered.filter((item) => {
    const matchSearch =
      item.nome.toLowerCase().includes(search.toLowerCase()) ||
      item.cpf.includes(search)
    const matchStatus = !statusFilter || item.status === statusFilter
    const matchGenero = !generoFilter || item.genero === generoFilter

    // Filtro de idade
    let matchIdade = true
    if (idadeFilter) {
      const today = new Date()
      const birthDate = new Date(
        item.dataNascimento.split('/').reverse().join('-')
      )
      const age = today.getFullYear() - birthDate.getFullYear()

      if (idadeFilter === '0-17') matchIdade = age >= 0 && age <= 17
      else if (idadeFilter === '18-30') matchIdade = age >= 18 && age <= 30
      else if (idadeFilter === '31-50') matchIdade = age >= 31 && age <= 50
      else if (idadeFilter === '51+') matchIdade = age >= 51
    }

    return matchSearch && matchStatus && matchGenero && matchIdade
  })

  // Configuração de paginação
  const pageSize = 10
  const totalItems = filtered.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = filtered.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSheltered([...sheltered, form])
    setForm(initialForm)
    setModalOpen(false)
  }

  const handleDeleteClick = (person: Sheltered) => {
    setShelteredToDelete(person)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!shelteredToDelete) return

    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Deleted:', shelteredToDelete)
      setSheltered(
        sheltered.filter((s) => s.cpf !== shelteredToDelete.cpf),
      )
    } catch (error) {
      console.error('Error deleting sheltered:', error)
    } finally {
      setIsDeleting(false)
      setDeleteModalOpen(false)
      setShelteredToDelete(null)
    }
  }

  const columns: Column<Sheltered>[] = [
    {
      header: 'Nome',
      accessor: 'nome',
      width: '200px',
    },
    {
      header: 'CPF',
      accessor: 'cpf',
      width: '150px',
    },
    {
      header: 'Data de Nascimento',
      accessor: 'dataNascimento',
      width: '180px',
    },
    {
      header: 'Gênero',
      accessor: 'genero',
      width: '120px',
    },
    {
      header: 'Status',
      accessor: (row) => <StatusBadge status={row.status} />,
      width: '120px',
    },
  ]

  return (
    <PageLayout
      title="Gestão de Abrigados"
      subtitle="Visualize e gerencie todos os indivíduos abrigados."
      onAdd={() => setModalOpen(true)}
      addButtonText="Adicionar Novo Abrigado"
    >
      <FilterBar
        searchValue={search}
        searchPlaceholder="Buscar abrigado..."
        onSearchChange={setSearch}

        filters={
          <>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'Ativo', label: 'Ativo' },
                { value: 'Inativo', label: 'Inativo' },
                { value: 'Pendente', label: 'Pendente' },
              ]}
              placeholder="Status"
            />
            <Select
              value={generoFilter}
              onChange={(e) => setGeneroFilter(e.target.value)}
              options={[
                { value: 'Masculino', label: 'Masculino' },
                { value: 'Feminino', label: 'Feminino' },
                { value: 'Outro', label: 'Outro' },
              ]}
              placeholder="Gênero"
            />
            <Select
              value={idadeFilter}
              onChange={(e) => setIdadeFilter(e.target.value)}
              options={[
                { value: '0-18', label: '0-18 anos' },
                { value: '19-30', label: '19-30 anos' },
                { value: '31-50', label: '31-50 anos' },
                { value: '51+', label: '51+ anos' },
              ]}
              placeholder="Idade"
            />
          </>
        }
        onClearFilters={() => {
          setSearch('')
          setStatusFilter('')
          setGeneroFilter('')
          setIdadeFilter('')
        }}
      />

      <TableCard
        title="Lista de Abrigados"
        subtitle="Gerencie os detalhes de cada indivíduo abrigado."
      >
        <DataTable
          data={paginatedData}
          columns={columns}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={handleDeleteClick}
          emptyMessage="Nenhum abrigado encontrado."
          pagination={{
            currentPage,
            totalPages,
            onPageChange: handlePageChange,
            pageSize,
            totalItems,
          }}
        />
      </TableCard>

      {/* Modal de confirmação de deleção */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setShelteredToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o abrigado ${shelteredToDelete?.nome}?`}
        confirmText="Excluir"
        confirmButtonStyle={{ backgroundColor: '#E45B63' }}
        isLoading={isDeleting}
        loadingText="Excluindo..."
        showUndoWarning={true}
      />

      {/* Modal de cadastro */}
      {modalOpen && (
        <ModalRoot onClose={() => setModalOpen(false)}>
          <ModalHeader
            title="Cadastrar Novo Abrigado"
            onClose={() => setModalOpen(false)}
          />
          <ModalContent>
            <FormRoot onSubmit={handleSubmit}>
              <FormRow columns={1}>
                <FormField label="Nome Completo" htmlFor="nome" required>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder="Digite o nome completo"
                    value={form.nome}
                    onChange={handleInput}
                    required
                  />
                </FormField>
              </FormRow>

              <FormRow>
                <FormField label="CPF" htmlFor="cpf" required>
                  <Input
                    id="cpf"
                    name="cpf"
                    placeholder="000.000.000-00"
                    value={form.cpf}
                    onChange={handleInput}
                    required
                  />
                </FormField>

                <FormField label="Data de Nascimento" htmlFor="dataNascimento" required>
                  <Input
                    id="dataNascimento"
                    name="dataNascimento"
                    type="date"
                    value={form.dataNascimento}
                    onChange={handleInput}
                    required
                  />
                </FormField>
              </FormRow>

              <FormRow>
                <FormField label="Gênero" htmlFor="genero" required>
                  <Select
                    id="genero"
                    name="genero"
                    value={form.genero}
                    onChange={handleInput}
                    options={[
                      { value: 'Masculino', label: 'Masculino' },
                      { value: 'Feminino', label: 'Feminino' },
                      { value: 'Outro', label: 'Outro' },
                    ]}
                    placeholder="Selecione o gênero"
                    required
                  />
                </FormField>

                <FormField label="Status" htmlFor="status" required>
                  <Select
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleInput}
                    options={[
                      { value: 'Ativo', label: 'Ativo' },
                      { value: 'Inativo', label: 'Inativo' },
                      { value: 'Pendente', label: 'Pendente' },
                    ]}
                    required
                  />
                </FormField>
              </FormRow>

              <ModalActions>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Cadastrar Abrigado
                </Button>
              </ModalActions>
            </FormRoot>
          </ModalContent>
        </ModalRoot>
      )}
    </PageLayout>
  )
}
