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

import { CATEGORIAS, UNIDADES, STATUS_OPTIONS } from '../constants/resources'

interface ModalFormProps {
  isOpen: boolean
  onClose: () => void
  form: {
    nome: string
    categoria: string
    quantidade: string
    unidade: string
    validade: string
    status: string
  }
  onInputChange: (
    _event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onSubmit: (_event: React.FormEvent) => void
  isSubmitting?: boolean
  isEditMode?: boolean
}

export function ModalForm({
  isOpen,
  onClose,
  form,
  onInputChange,
  onSubmit,
  isSubmitting = false,
  isEditMode = false,
}: ModalFormProps) {
  if (!isOpen) return null

  return (
    <ModalRoot onClose={onClose}>
      <ModalHeader
        title={isEditMode ? 'Editar Recurso' : 'Cadastrar Novo Recurso'}
        onClose={onClose}
      />
      <ModalContent>
        <FormRoot onSubmit={onSubmit}>
          <FormRow columns={1}>
            <FormField label="Nome do Recurso" htmlFor="nome" required>
              <Input
                id="nome"
                name="nome"
                placeholder="Digite o nome do recurso"
                value={form.nome}
                onChange={onInputChange}
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
                onChange={onInputChange}
                options={CATEGORIAS.map((cat) => ({
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
                onChange={onInputChange}
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
                onChange={onInputChange}
                options={UNIDADES.map((un) => ({
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
                onChange={onInputChange}
              />
            </FormField>
          </FormRow>

          <FormRow>
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
            <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting
                ? isEditMode
                  ? 'Salvando...'
                  : 'Cadastrando...'
                : isEditMode
                  ? 'Salvar Alterações'
                  : 'Cadastrar Recurso'}
            </Button>
          </ModalActions>
        </FormRoot>
      </ModalContent>
    </ModalRoot>
  )
}
