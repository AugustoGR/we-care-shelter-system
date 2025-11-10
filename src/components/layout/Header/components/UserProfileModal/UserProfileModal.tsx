'use client'

import React, { useState, useEffect } from 'react'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/ui/button'
import { FormField, FormRow, FormRoot } from '@/components/ui/Form'
import { Input } from '@/components/ui/input'
import { useUserProfile } from '@/hooks/useUserProfile'

import styles from './UserProfileModal.module.scss'

interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'view' | 'edit'
}

export function UserProfileModal({
  isOpen,
  onClose,
  mode,
}: UserProfileModalProps) {
  const { user, updateUser, isLoading, error } = useUserProfile()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    password: '',
    confirmPassword: '',
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const isEditMode = mode === 'edit'

  // Preenche o formulário quando o modal abre
  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        currentPassword: '',
        password: '',
        confirmPassword: '',
      })
      setFormError(null)
      setSuccessMessage(null)
    }
  }, [isOpen, user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isEditMode) return

    // Validações
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError('Nome e e-mail são obrigatórios')
      return
    }

    // Validações de senha
    if (formData.password || formData.currentPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        setFormError('Digite sua senha atual para alterá-la')
        return
      }

      if (!formData.password) {
        setFormError('Digite a nova senha')
        return
      }

      if (!formData.confirmPassword) {
        setFormError('Confirme a nova senha')
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setFormError('A nova senha e a confirmação não coincidem')
        return
      }

      if (formData.password.length < 6) {
        setFormError('A nova senha deve ter no mínimo 6 caracteres')
        return
      }

      if (formData.password === formData.currentPassword) {
        setFormError('A nova senha deve ser diferente da senha atual')
        return
      }
    }

    try {
      const updateData: any = {
        name: formData.name,
        email: formData.email,
      }

      if (formData.password && formData.currentPassword) {
        updateData.password = formData.password
        updateData.currentPassword = formData.currentPassword
      }

      await updateUser(updateData)
      setSuccessMessage('Perfil atualizado com sucesso!')

      // Fecha o modal após 2 segundos
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (err: any) {
      setFormError(err.message || 'Erro ao atualizar perfil')
    }
  }

  if (!isOpen || !user) return null

  return (
    <Modal.Root onClose={onClose}>
      <Modal.Header
        title={isEditMode ? 'Editar Perfil' : 'Meu Perfil'}
        onClose={onClose}
      />
      <Modal.Content>
        <FormRoot onSubmit={handleSubmit}>
          <FormRow columns={1}>
            <FormField label="Nome Completo" htmlFor="name" required>
              <Input
                id="name"
                name="name"
                placeholder="Digite seu nome completo"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditMode || isLoading}
                required
              />
            </FormField>
          </FormRow>

          <FormRow columns={1}>
            <FormField label="E-mail" htmlFor="email" required>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditMode || isLoading}
                required
              />
            </FormField>
          </FormRow>

          {isEditMode && (
            <>
              <FormRow columns={1}>
                <FormField
                  label="Senha Atual (preencha para alterar a senha)"
                  htmlFor="currentPassword"
                >
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    placeholder="Digite sua senha atual"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </FormField>
              </FormRow>

              {formData.currentPassword && (
                <>
                  <FormRow columns={1}>
                    <FormField label="Nova Senha" htmlFor="password" required>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Digite a nova senha"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        required
                      />
                    </FormField>
                  </FormRow>

                  <FormRow columns={1}>
                    <FormField
                      label="Confirmar Nova Senha"
                      htmlFor="confirmPassword"
                      required
                    >
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirme a nova senha"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        required
                      />
                    </FormField>
                  </FormRow>
                </>
              )}
            </>
          )}

          {(formError || error) && (
            <div className={styles.errorMessage}>
              {formError || error}
            </div>
          )}

          {successMessage && (
            <div className={styles.successMessage}>{successMessage}</div>
          )}
        </FormRoot>
      </Modal.Content>
      <Modal.Footer>
        <Modal.Actions>
          <Button type="button" variant="secondary" onClick={onClose}>
            {isEditMode ? 'Cancelar' : 'Fechar'}
          </Button>
          {isEditMode && (
            <Button
              type="button"
              variant="primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          )}
        </Modal.Actions>
      </Modal.Footer>
    </Modal.Root>
  )
}
