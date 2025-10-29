'use client'
import React from 'react'

import { Modal } from '@/components/layout/Modal'

import { Button } from './button'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmButtonStyle?: React.CSSProperties
  confirmButtonVariant?: 'default' | 'ghost' | 'primary' | 'secondary'
  isLoading?: boolean
  loadingText?: string
  showUndoWarning?: boolean
  undoWarningText?: string
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar Ação',
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmButtonStyle,
  confirmButtonVariant = 'primary',
  isLoading = false,
  loadingText = 'Processando...',
  showUndoWarning = false,
  undoWarningText = 'Esta ação não pode ser desfeita.',
}: ConfirmationModalProps) {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Modal.Root onClose={onClose}>
      <Modal.Header title={title} onClose={onClose} />
      <Modal.Content>
        <p style={{ marginBottom: showUndoWarning ? '8px' : '0' }}>
          {message}
        </p>
        {showUndoWarning && (
          <p style={{ color: '#E45B63', fontSize: '14px', margin: 0 }}>
            {undoWarningText}
          </p>
        )}
      </Modal.Content>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button
          variant={confirmButtonVariant}
          onClick={handleConfirm}
          disabled={isLoading}
          style={confirmButtonStyle}
        >
          {isLoading ? loadingText : confirmText}
        </Button>
      </Modal.Footer>
    </Modal.Root>
  )
}
