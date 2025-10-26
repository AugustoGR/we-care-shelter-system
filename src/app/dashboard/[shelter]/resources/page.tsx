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

import styles from './Resources.module.scss'

interface Resource {
  nome: string
  categoria: string
  quantidade: number
  unidade: string
  validade: string
  status: string
}

const categorias = ['Alimentos', 'Medicamentos', 'Higiene', 'Água']
const unidades = [
  'pacotes',
  'cartelas',
  'unidades',
  'garrafões',
  'rolos',
  'latas',
]

const MOCK_RESOURCES: Resource[] = [
  {
    nome: 'Arroz 5kg',
    categoria: 'Alimentos',
    quantidade: 50,
    unidade: 'pacotes',
    validade: '2025-12-31',
    status: 'Em Estoque',
  },
  {
    nome: 'Paracetamol 500mg',
    categoria: 'Medicamentos',
    quantidade: 12,
    unidade: 'cartelas',
    validade: '2024-07-20',
    status: 'Estoque Baixo',
  },
  {
    nome: 'Sabonete Líquido',
    categoria: 'Higiene',
    quantidade: 30,
    unidade: 'unidades',
    validade: '2025-01-15',
    status: 'Em Estoque',
  },
  {
    nome: 'Água Mineral 5L',
    categoria: 'Água',
    quantidade: 5,
    unidade: 'garrafões',
    validade: '2024-06-01',
    status: 'Vencido',
  },
  {
    nome: 'Ataduras Estéreis',
    categoria: 'Medicamentos',
    quantidade: 8,
    unidade: 'rolos',
    validade: '2024-11-01',
    status: 'Estoque Baixo',
  },
  {
    nome: 'Feijão 1kg',
    categoria: 'Alimentos',
    quantidade: 45,
    unidade: 'pacotes',
    validade: '2025-10-20',
    status: 'Em Estoque',
  },
  {
    nome: 'Fraldas G',
    categoria: 'Higiene',
    quantidade: 20,
    unidade: 'pacotes',
    validade: '2026-03-01',
    status: 'Em Estoque',
  },
  {
    nome: 'Máscaras Cirúrgicas',
    categoria: 'Medicamentos',
    quantidade: 200,
    unidade: 'unidades',
    validade: '2024-09-01',
    status: 'Em Estoque',
  },
  {
    nome: 'Lenços Umedecidos',
    categoria: 'Higiene',
    quantidade: 7,
    unidade: 'pacotes',
    validade: '2024-08-10',
    status: 'Estoque Baixo',
  },
  {
    nome: 'Leite em Pó',
    categoria: 'Alimentos',
    quantidade: 10,
    unidade: 'latas',
    validade: '2024-07-15',
    status: 'Estoque Baixo',
  },
]

const initialForm = {
  nome: '',
  categoria: '',
  quantidade: '',
  unidade: '',
  validade: '',
  status: 'Em Estoque',
}

export default function Resources() {
  const [resources] = useState<Resource[]>(MOCK_RESOURCES)
  const [search, setSearch] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(initialForm)

  const filteredResources = resources.filter((item) => {
    const matchNome = item.nome.toLowerCase().includes(search.toLowerCase())
    const matchCategoria = categoriaFiltro
      ? item.categoria === categoriaFiltro
      : true
    return matchNome && matchCategoria
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

  const columns: Column<Resource>[] = [
    {
      header: 'Nome',
      accessor: 'nome',
      width: '200px',
    },
    {
      header: 'Categoria',
      accessor: 'categoria',
      width: '140px',
    },
    {
      header: 'Quantidade',
      accessor: 'quantidade',
      width: '120px',
    },
    {
      header: 'Unidade',
      accessor: 'unidade',
      width: '120px',
    },
    {
      header: 'Validade',
      accessor: (row) => {
        const date = new Date(row.validade)
        return date.toLocaleDateString('pt-BR')
      },
      width: '140px',
    },
    {
      header: 'Status',
      accessor: (row) => <StatusBadge status={row.status} />,
      width: '150px',
    },
  ]

  return (
    <PageLayout
      title="Gerenciamento de Recursos"
      subtitle="Gerencie o inventário de recursos e controle de estoque."
      onAdd={() => setModalOpen(true)}
      addButtonText="Adicionar Recurso"
    >
      <FilterBar
        searchValue={search}
        searchPlaceholder="Buscar recurso..."
        onSearchChange={setSearch}

        filters={
          <Select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            options={categorias.map((cat) => ({ value: cat, label: cat }))}
            placeholder="Categoria"
          />
        }
        onClearFilters={() => {
          setSearch('')
          setCategoriaFiltro('')
        }}
      />

      <TableCard
        title="Inventário Detalhado"
        subtitle="Controle de estoque e validade dos recursos cadastrados."
      >
        <DataTable
          data={filteredResources}
          columns={columns}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={(row) => console.log('Delete', row)}
          emptyMessage="Nenhum recurso encontrado."
        />
      </TableCard>

      {/* Modal de cadastro */}
      {modalOpen && (
        <ModalRoot onClose={() => setModalOpen(false)}>
          <ModalHeader
            title="Cadastrar Novo Recurso"
            onClose={() => setModalOpen(false)}
          />
          <ModalContent>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <FormRow columns={1}>
                <FormField label="Nome do Recurso" htmlFor="nome" required>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder="Digite o nome do recurso"
                    value={form.nome}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>
              </FormRow>

              <FormRow>
                <FormField label="Categoria" htmlFor="categoria" required>
                  <Select
                    id="categoria"
                    name="categoria"
                    value={form.categoria}
                    onChange={handleInputChange}
                    options={categorias.map((cat) => ({
                      value: cat,
                      label: cat,
                    }))}
                    placeholder="Selecione"
                    required
                  />
                </FormField>

                <FormField label="Quantidade" htmlFor="quantidade" required>
                  <Input
                    id="quantidade"
                    name="quantidade"
                    type="number"
                    placeholder="0"
                    value={form.quantidade}
                    onChange={handleInputChange}
                    required
                  />
                </FormField>
              </FormRow>

              <FormRow>
                <FormField label="Unidade" htmlFor="unidade" required>
                  <Select
                    id="unidade"
                    name="unidade"
                    value={form.unidade}
                    onChange={handleInputChange}
                    options={unidades.map((un) => ({
                      value: un,
                      label: un,
                    }))}
                    placeholder="Selecione"
                    required
                  />
                </FormField>

                <FormField label="Validade" htmlFor="validade">
                  <Input
                    id="validade"
                    name="validade"
                    type="date"
                    value={form.validade}
                    onChange={handleInputChange}
                  />
                </FormField>
              </FormRow>

              <FormRow>
                <FormField label="Status" htmlFor="status" required>
                  <Select
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                    options={[
                      { value: 'Em Estoque', label: 'Em Estoque' },
                      { value: 'Estoque Baixo', label: 'Estoque Baixo' },
                      { value: 'Vencido', label: 'Vencido' },
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
                  Cadastrar Recurso
                </Button>
              </ModalActions>
            </form>
          </ModalContent>
        </ModalRoot>
      )}
    </PageLayout>
  )
}
