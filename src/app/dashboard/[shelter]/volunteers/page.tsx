'use client'
import React, { useState } from 'react'

import { FilterBar } from '@/components/layout/FilterBar'
import { ModalRoot, ModalHeader, ModalContent, ModalActions } from '@/components/layout/Modal'
import { PageLayout } from '@/components/layout/PageLayout'
import { TableCard } from '@/components/layout/TableCard'
import { Button } from '@/components/ui/button'
import { DataTable, Column } from '@/components/ui/DataTable'
import { FormField, FormRow } from '@/components/ui/Form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { StatusBadge } from '@/components/ui/StatusBadge'

import styles from './Volunteers.module.scss'

interface Volunteer {
  name: string
  phone: string
  email: string
  skills: string[]
  status: string
  lastActivity: string
}

const VOLUNTEERS: Volunteer[] = [
  {
    name: 'Ana Silva',
    phone: '(11) 98765-4321',
    email: 'ana.silva@example.com',
    skills: ['Enfermagem', 'Organização'],
    status: 'Ativo',
    lastActivity: '2 horas atrás',
  },
  {
    name: 'Carlos Mendes',
    phone: '(21) 99876-1234',
    email: 'carlos.mendes@example.com',
    skills: ['Logística', 'Transporte'],
    status: 'Ativo',
    lastActivity: '4 horas atrás',
  },
  {
    name: 'Beatriz Costa',
    phone: '(31) 97654-9876',
    email: 'bia.costa@example.com',
    skills: ['Psicologia', 'Apoio emocional'],
    status: 'Inativo',
    lastActivity: '1 dia atrás',
  },
  {
    name: 'João Pereira',
    phone: '(41) 91234-5678',
    email: 'joao.pereira@example.com',
    skills: ['Culinária', 'Limpeza'],
    status: 'Ausente',
    lastActivity: '3 dias atrás',
  },
  {
    name: 'Sofia Oliveira',
    phone: '(51) 96789-0123',
    email: 'sofia.oliveira@example.com',
    skills: ['Veterinária', 'Cuidado animal'],
    status: 'Ativo',
    lastActivity: '8 horas atrás',
  },
  {
    name: 'Miguel Santos',
    phone: '(61) 95432-8765',
    email: 'miguel.santos@example.com',
    skills: ['Manutenção', 'Eletricista'],
    status: 'Ativo',
    lastActivity: '1 hora atrás',
  },
]

const initialForm = {
  name: '',
  phone: '',
  email: '',
  skills: '',
  status: 'Ativo',
}

export default function VolunteersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(initialForm)

  const filtered = VOLUNTEERS.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter ? v.status === statusFilter : true
    return matchSearch && matchStatus
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', form)
    setModalOpen(false)
    setForm(initialForm)
  }

  const columns: Column<Volunteer>[] = [
    {
      header: 'Nome',
      accessor: 'name',
      width: '200px',
    },
    {
      header: 'Contato',
      accessor: 'phone',
      width: '150px',
    },
    {
      header: 'Email',
      accessor: 'email',
      width: '220px',
    },
    {
      header: 'Habilidades',
      accessor: (row) => (
        <div className={styles.skillsCell}>
          {row.skills.map((skill, idx) => (
            <span key={idx} className={styles.skillTag}>
              {skill}
            </span>
          ))}
        </div>
      ),
      width: '250px',
    },
    {
      header: 'Status',
      accessor: (row) => <StatusBadge status={row.status} />,
      width: '120px',
    },
    {
      header: 'Última Atividade',
      accessor: 'lastActivity',
      width: '160px',
    },
  ]

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
            options={[
              { value: 'Ativo', label: 'Ativo' },
              { value: 'Inativo', label: 'Inativo' },
              { value: 'Ausente', label: 'Ausente' },
            ]}
            placeholder="Status"
          />
        }
        onClearFilters={() => {
          setSearch('')
          setStatusFilter('')
        }}
      />

      <TableCard
        title="Lista de Voluntários"
        subtitle="Gerencie os voluntários registrados e suas informações."
      >
        <DataTable
          data={filtered}
          columns={columns}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={(row) => console.log('Delete', row)}
          emptyMessage="Nenhum voluntário encontrado."
        />
      </TableCard>

      {/* Modal de cadastro */}
      {modalOpen && (
        <ModalRoot onClose={() => setModalOpen(false)}>
          <ModalHeader
            title="Cadastrar Novo Voluntário"
            onClose={() => setModalOpen(false)}
          />
          <ModalContent>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <FormRow columns={1}>
                <FormField label="Nome Completo" htmlFor="name" required>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Digite o nome completo"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>
              </FormRow>

              <FormRow>
                <FormField label="Telefone" htmlFor="phone" required>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(00) 00000-0000"
                    value={form.phone}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>

                <FormField label="E-mail" htmlFor="email" required>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>
              </FormRow>

              <FormRow>
                <FormField label="Habilidades" htmlFor="skills">
                  <Input
                    id="skills"
                    name="skills"
                    placeholder="Ex: Enfermagem, Culinária"
                    value={form.skills}
                    onChange={handleInputChange}
                  />
                </FormField>

                <FormField label="Status" htmlFor="status" required>
                  <Select
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                    options={[
                      { value: 'Ativo', label: 'Ativo' },
                      { value: 'Inativo', label: 'Inativo' },
                      { value: 'Ausente', label: 'Ausente' },
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
                  Cadastrar Voluntário
                </Button>
              </ModalActions>
            </form>
          </ModalContent>
        </ModalRoot>
      )}
    </PageLayout>
  )
}
