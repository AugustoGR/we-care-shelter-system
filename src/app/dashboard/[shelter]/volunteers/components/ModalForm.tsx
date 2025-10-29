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

import { STATUS_OPTIONS } from '../constants/volunteers'

interface ModalFormProps {
  isOpen: boolean
  onClose: () => void
  form: {
    name: string
    phone: string
    email: string
    skills: string
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
      <ModalHeader title="Cadastrar Novo Voluntário" onClose={onClose} />
      <ModalContent>
        <FormRoot onSubmit={onSubmit}>
          <FormRow columns={1}>
            <FormField label="Nome Completo" htmlFor="name" required>
              <Input
                id="name"
                name="name"
                placeholder="Digite o nome completo"
                value={form.name}
                onChange={onInputChange}
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
                onChange={onInputChange}
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
                onChange={onInputChange}
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
                onChange={onInputChange}
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
              Cadastrar Voluntário
            </Button>
          </ModalActions>
        </FormRoot>
      </ModalContent>
    </ModalRoot>
  )
}
