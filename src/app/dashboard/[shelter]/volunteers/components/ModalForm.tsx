import React from 'react'

import {
  ModalRoot,
  ModalHeader,
  ModalContent,
  ModalActions,
} from '@/components/layout/Modal'
import {
  Autocomplete,
  AutocompleteOption,
} from '@/components/ui/Autocomplete'
import { Button } from '@/components/ui/button'
import { FormField, FormRow, FormRoot } from '@/components/ui/Form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { api } from '@/services'

import { STATUS_OPTIONS } from '../constants/volunteers'

interface ModalFormProps {
  isOpen: boolean
  onClose: () => void
  form: {
    userId: string
    phone: string
    skills: string
    status: string
  }
  onInputChange: (
    _event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onUserSelect: (_userId: string, _userName: string, _userEmail: string) => void
  onSubmit: (_event: React.FormEvent) => void
  isEditMode?: boolean
  isSubmitting?: boolean
}

interface User {
  id: string
  name: string
  email: string
}

export function ModalForm({
  isOpen,
  onClose,
  form,
  onInputChange,
  onUserSelect,
  onSubmit,
  isEditMode = false,
  isSubmitting = false,
}: ModalFormProps) {
  const searchUsers = async (query: string): Promise<AutocompleteOption[]> => {
    try {
      const response = await api.get<User[]>('/users/search', {
        params: { email: query },
      })
      return response.data.map((user) => ({
        id: user.id,
        label: user.name,
        email: user.email,
      }))
    } catch (error) {
      console.error('Error searching users:', error)
      return []
    }
  }

  const handleUserSelect = (userId: string, option?: AutocompleteOption) => {
    if (option) {
      onUserSelect(userId, option.label, option.email || '')
    } else {
      onUserSelect('', '', '')
    }
  }

  if (!isOpen) return null

  return (
    <ModalRoot onClose={onClose}>
      <ModalHeader
        title={isEditMode ? 'Editar Voluntário' : 'Cadastrar Novo Voluntário'}
        onClose={onClose}
      />
      <ModalContent>
        <FormRoot onSubmit={onSubmit}>
          <FormRow columns={1}>
            <FormField
              label="E-mail do Usuário"
              htmlFor="userEmail"
              required
            >
              <Autocomplete
                id="userEmail"
                name="userEmail"
                onChange={handleUserSelect}
                onSearch={searchUsers}
                placeholder="Digite o email do usuário (mínimo 3 caracteres)..."
                minChars={3}
                required
                disabled={isEditMode}
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

          <FormRow columns={1}>
            <FormField label="Habilidades" htmlFor="skills">
              <Input
                id="skills"
                name="skills"
                placeholder="Ex: Enfermagem, Culinária"
                value={form.skills}
                onChange={onInputChange}
              />
            </FormField>
          </FormRow>

          <ModalActions>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={!form.userId || isSubmitting}>
              {isEditMode ? 'Salvar Alterações' : 'Cadastrar Voluntário'}
            </Button>
          </ModalActions>
        </FormRoot>
      </ModalContent>
    </ModalRoot>
  )
}
