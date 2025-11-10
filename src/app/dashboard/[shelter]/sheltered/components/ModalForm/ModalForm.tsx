import React from 'react'

import {
  ModalRoot,
  ModalHeader,
  ModalContent,
  ModalActions,
} from '@/components/layout/Modal'
import { Button } from '@/components/ui/button'
import { FormField, FormRow, FormRoot } from '@/components/ui/Form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

import { GENERO_OPTIONS, STATUS_OPTIONS } from '../../constants/sheltered'

interface ModalFormProps {
  isOpen: boolean
  onClose: () => void
  form: {
    nome: string
    cpf: string
    dataNascimento: string
    genero: string
    status: string
  }
  onInputChange: (field: string, value: string) => void
  onSubmit: () => void
  isEditMode?: boolean
  isSaving?: boolean
}

export function ModalForm({
  isOpen,
  onClose,
  form,
  onInputChange,
  onSubmit,
  isEditMode = false,
  isSaving = false,
}: ModalFormProps) {
  if (!isOpen) return null

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    onInputChange(e.target.name, e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <ModalRoot onClose={onClose}>
      <ModalHeader
        title={
          isEditMode ? 'Editar Abrigado' : 'Cadastrar Novo Abrigado'
        }
        onClose={onClose}
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
                onChange={handleInputChange}
                required
                disabled={isSaving}
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
                onChange={handleInputChange}
                required
                disabled={isSaving}
              />
            </FormField>

            <FormField
              label="Data de Nascimento"
              htmlFor="dataNascimento"
              required
            >
              <Input
                id="dataNascimento"
                name="dataNascimento"
                type="date"
                value={form.dataNascimento}
                onChange={handleInputChange}
                required
                disabled={isSaving}
              />
            </FormField>
          </FormRow>

          <FormRow>
            <FormField label="Gênero" htmlFor="genero" required>
              <Select
                id="genero"
                name="genero"
                value={form.genero}
                onChange={handleInputChange}
                options={GENERO_OPTIONS}
                placeholder="Selecione o gênero"
                required
                disabled={isSaving}
              />
            </FormField>

            <FormField label="Status" htmlFor="status" required>
              <Select
                id="status"
                name="status"
                value={form.status}
                onChange={handleInputChange}
                options={STATUS_OPTIONS}
                required
                disabled={isSaving}
              />
            </FormField>
          </FormRow>

          <ModalActions>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving
                ? 'Salvando...'
                : isEditMode
                  ? 'Salvar Alterações'
                  : 'Cadastrar Abrigado'}
            </Button>
          </ModalActions>
        </FormRoot>
      </ModalContent>
    </ModalRoot>
  )
}
