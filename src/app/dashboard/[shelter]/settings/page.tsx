'use client'

import React from 'react'

import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { FormField, FormRow, FormRoot } from '@/components/ui/Form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

import { useShelterSettings } from './hooks'
import styles from './ShelterSettings.module.scss'

export default function ShelterSettingsPage() {
  const {
    isAdmin,
    permissionsLoading,
    isLoading,
    isSaving,
    error,
    successMessage,
    formData,
    calamities,
    handleInputChange,
    handleSwitchChange,
    handleSubmit,
    handleCancel,
  } = useShelterSettings()

  if (permissionsLoading || isLoading) {
    return (
      <PageLayout title="Gerenciamento do Abrigo">
        <div className={styles.loading}>Carregando...</div>
      </PageLayout>
    )
  }

  if (!isAdmin) {
    return null // Redireciona no useEffect
  }

  return (
    <PageLayout
      title="Gerenciamento do Abrigo"
      subtitle="Configure e gerencie as informações do abrigo"
    >
      <div className={styles.content}>
        <FormRoot onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Informações Básicas</h3>

            <FormRow columns={1}>
              <FormField label="Nome do Abrigo" htmlFor="name" required>
                <Input
                  id="name"
                  name="name"
                  placeholder="Digite o nome do abrigo"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSaving}
                  required
                />
              </FormField>
            </FormRow>

            <FormRow columns={1}>
              <FormField label="Descrição" htmlFor="description">
                <textarea
                  id="description"
                  name="description"
                  className={styles.textarea}
                  placeholder="Descreva o abrigo (opcional)"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={isSaving}
                  rows={4}
                />
              </FormField>
            </FormRow>

            <FormRow columns={1}>
              <FormField label="Tipo de Calamidade" htmlFor="calamity" required>
                <Select
                  id="calamity"
                  name="calamity"
                  value={formData.calamity}
                  onChange={handleInputChange}
                  options={calamities.map((c) => ({ value: c, label: c }))}
                  placeholder="Selecione o tipo de calamidade"
                  disabled={isSaving}
                  required
                />
              </FormField>
            </FormRow>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Endereço</h3>

            <FormRow columns={1}>
              <FormField label="Endereço Completo" htmlFor="address" required>
                <Input
                  id="address"
                  name="address"
                  placeholder="Rua, número, complemento"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={isSaving}
                  required
                />
              </FormField>
            </FormRow>

            <FormRow columns={2}>
              <FormField label="Cidade" htmlFor="city" required>
                <Input
                  id="city"
                  name="city"
                  placeholder="Digite a cidade"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={isSaving}
                  required
                />
              </FormField>

              <FormField label="Estado" htmlFor="state" required>
                <Input
                  id="state"
                  name="state"
                  placeholder="UF"
                  value={formData.state}
                  onChange={handleInputChange}
                  disabled={isSaving}
                  required
                  maxLength={2}
                />
              </FormField>
            </FormRow>

            <FormRow columns={2}>
              <FormField label="CEP" htmlFor="cep" required>
                <Input
                  id="cep"
                  name="cep"
                  placeholder="00000-000"
                  value={formData.cep}
                  onChange={handleInputChange}
                  disabled={isSaving}
                  required
                />
              </FormField>

              <FormField label="Status" htmlFor="active">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSaving}
                  label="Abrigo ativo"
                />
              </FormField>
            </FormRow>
          </div>

          {error && (
            <div className={styles.errorMessage}>{error}</div>
          )}

          {successMessage && (
            <div className={styles.successMessage}>{successMessage}</div>
          )}

          <div className={styles.actions}>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSaving}
            >
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </FormRoot>
      </div>
    </PageLayout>
  )
}
