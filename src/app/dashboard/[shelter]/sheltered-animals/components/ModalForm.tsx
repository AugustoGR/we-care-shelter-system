import React from 'react'

import {
  ModalRoot,
  ModalHeader,
  ModalContent,
  ModalActions,
} from '@/components/layout/Modal'
import { Button } from '@/components/ui/button'
import { CheckboxGroup } from '@/components/ui/CheckboxGroup'
import { FileUpload } from '@/components/ui/FileUpload'
import { FormField, FormRow, FormRoot } from '@/components/ui/Form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { SEX_OPTIONS, HEALTH_OPTIONS } from '../constants/animals'
import styles from '../ShelteredAnimals.module.scss'

interface ModalFormProps {
  isOpen: boolean
  onClose: () => void
  form: {
    name: string
    species: string
    breed: string
    age: string
    sex: string
    health: string
    care: string
    rabies: boolean
    cinomose: boolean
    parvo: boolean
    felina: boolean
    photo: File | null
  }
  onInputChange: (
    _event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void
  onCheckboxChange: (_name: string, _checked: boolean) => void
  onFileChange: (_file: File | null) => void
  onSubmit: (_event: React.FormEvent) => void
  isSaving?: boolean
}

export function ModalForm({
  isOpen,
  onClose,
  form,
  onInputChange,
  onCheckboxChange,
  onFileChange,
  onSubmit,
  isSaving = false,
}: ModalFormProps) {
  if (!isOpen) return null

  return (
    <ModalRoot onClose={onClose}>
      <ModalHeader title="Registrar Novo Animal" onClose={onClose} />
      <ModalContent>
        <FormRoot onSubmit={onSubmit}>
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
                onChange={onInputChange}
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
                onChange={onInputChange}
                required
              />
            </FormField>

            <FormField label="Raça" htmlFor="breed">
              <Input
                id="breed"
                name="breed"
                placeholder="Labrador, Siamês, etc."
                value={form.breed}
                onChange={onInputChange}
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
                onChange={onInputChange}
              />
            </FormField>

            <FormField label="Sexo" htmlFor="sex" required>
              <Select
                id="sex"
                name="sex"
                value={form.sex}
                onChange={onInputChange}
                options={SEX_OPTIONS}
                placeholder="Selecione o sexo"
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
                onChange={onInputChange}
                options={HEALTH_OPTIONS}
                placeholder="Selecione o estado de saúde"
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
                onChange={onInputChange}
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
                onChange: (checked) => onCheckboxChange('rabies', checked),
              },
              {
                label: 'Cinomose',
                value: 'cinomose',
                checked: form.cinomose,
                onChange: (checked) => onCheckboxChange('cinomose', checked),
              },
              {
                label: 'Parvovirose',
                value: 'parvo',
                checked: form.parvo,
                onChange: (checked) => onCheckboxChange('parvo', checked),
              },
              {
                label: 'Felina',
                value: 'felina',
                checked: form.felina,
                onChange: (checked) => onCheckboxChange('felina', checked),
              },
            ]}
          />

          <FileUpload
            id="photo-upload"
            label="Foto do Animal"
            description="Envie uma foto clara do animal."
            accept="image/*"
            value={form.photo}
            onChange={onFileChange}
          />
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
              {isSaving ? 'Salvando...' : 'Salvar Animal'}
            </Button>
          </ModalActions>
        </FormRoot>
      </ModalContent>
    </ModalRoot>
  )
}
