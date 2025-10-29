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

import { GENERO_OPTIONS, STATUS_OPTIONS } from '../constants/sheltered'

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
  onInputChange: (
    _event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onSubmit: (_event: React.FormEvent) => void
}

export function ModalForm({
  isOpen,
  onClose,
  form,
  onInputChange,
  onSubmit,
}: ModalFormProps) {
  if (!isOpen) return null

  return (
    <ModalRoot onClose={onClose}>
      <ModalHeader title="Cadastrar Novo Abrigado" onClose={onClose} />
      <ModalContent>
        <FormRoot onSubmit={onSubmit}>
          <FormRow columns={1}>
            <FormField label="Nome Completo" htmlFor="nome" required>
              <Input
                id="nome"
                name="nome"
                placeholder="Digite o nome completo"
                value={form.nome}
                onChange={onInputChange}
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
                onChange={onInputChange}
                required
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
                onChange={onInputChange}
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
                onChange={onInputChange}
                options={GENERO_OPTIONS}
                placeholder="Selecione o gênero"
                required
              />
            </FormField>

            <FormField label="Status" htmlFor="status" required>
              <Select
                id="status"
                name="status"
                value={form.status}
                onChange={onInputChange}
                options={STATUS_OPTIONS}
                required
              />
            </FormField>
          </FormRow>

          <ModalActions>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Cadastrar Abrigado
            </Button>
          </ModalActions>
        </FormRoot>
      </ModalContent>
    </ModalRoot>
  )
}
