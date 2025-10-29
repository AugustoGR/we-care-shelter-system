'use client'
import React from 'react'

import { Button } from '@/components/ui/button'
import { FormField, FormRow, FormRoot } from '@/components/ui/Form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import { CALAMITIES, BRAZILIAN_STATES } from './constants/shelter-form'
import { useNewShelter } from './hooks/useNewShelter'
import styles from './NewShelter.module.scss'

export default function NewShelter() {
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
    handleCancel,
    handleActiveChange,
  } = useNewShelter()

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Cadastro de Abrigo</h1>
        <h2 className={styles.formSubtitle}>
          Preencha os detalhes para registrar um novo abrigo emergencial.
        </h2>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <FormRoot className={styles.form} onSubmit={handleSubmit}>
          <FormRow columns={1}>
            <FormField label="Nome do Abrigo" htmlFor="name" required>
              <Input
                id="name"
                type="text"
                placeholder="Ex: Abrigo Esperança"
                value={formData.name}
                onChange={handleInputChange}
                disabled={loading}
              />
            </FormField>
          </FormRow>

          <FormRow columns={1}>
            <FormField label="Descrição do Abrigo" htmlFor="description">
              <Textarea
                id="description"
                placeholder="Uma breve descrição sobre o abrigo e suas características."
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                disabled={loading}
              />
            </FormField>
          </FormRow>

          <FormRow columns={1}>
            <FormField label="Tipo de Calamidade" htmlFor="calamity" required>
              <Select
                id="calamity"
                value={formData.calamity}
                onChange={handleInputChange}
                options={CALAMITIES.map((c) => ({ value: c, label: c }))}
                placeholder="Selecione o tipo de calamidade"
                disabled={loading}
              />
            </FormField>
          </FormRow>

          <FormRow columns={2}>
            <FormField label="Endereço" htmlFor="address" required>
              <Input
                id="address"
                type="text"
                placeholder="Endereço (Ex: Rua da Paz, 123)"
                value={formData.address}
                onChange={handleInputChange}
                disabled={loading}
              />
            </FormField>

            <FormField label="Cidade" htmlFor="city" required>
              <Input
                id="city"
                type="text"
                placeholder="Cidade"
                value={formData.city}
                onChange={handleInputChange}
                disabled={loading}
              />
            </FormField>
          </FormRow>

          <FormRow columns={2}>
            <FormField label="Estado" htmlFor="state" required>
              <Select
                id="state"
                value={formData.state}
                onChange={handleInputChange}
                options={BRAZILIAN_STATES}
                placeholder="Selecione o estado"
                disabled={loading}
              />
            </FormField>

            <FormField label="CEP" htmlFor="cep" required>
              <Input
                id="cep"
                type="text"
                placeholder="CEP"
                value={formData.cep}
                onChange={handleInputChange}
                disabled={loading}
              />
            </FormField>
          </FormRow>

          <div className={styles.statusRow}>
            <span className={styles.statusLabel}>Abrigo Ativo</span>
            <Switch
              checked={formData.active}
              onCheckedChange={handleActiveChange}
              disabled={loading}
            />
          </div>

          <div className={styles.buttonRow}>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar Abrigo'}
            </Button>
          </div>
        </FormRoot>
      </div>
    </main>
  )
}
