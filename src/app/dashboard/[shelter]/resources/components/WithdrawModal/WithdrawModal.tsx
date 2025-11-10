import React, { useState, useMemo } from 'react'

import { ResourceProps } from '@/@types'
import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

import styles from './WithdrawModal.module.scss'

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
  resources: ResourceProps[]
  onConfirm: (resourceId: string, quantidade: number) => Promise<void>
  isLoading: boolean
}

export function WithdrawModal({
  isOpen,
  onClose,
  resources,
  onConfirm,
  isLoading,
}: WithdrawModalProps) {
  const [selectedResourceId, setSelectedResourceId] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [error, setError] = useState('')

  // Filtrar recursos com quantidade > 0 e não esgotados
  const availableResources = useMemo(() => {
    return resources.filter((resource) =>
      resource.quantidade > 0 && resource.status !== 'Esgotado'
    )
  }, [resources])

  const selectedResource = useMemo(() => {
    return availableResources.find((r) => r.id === selectedResourceId)
  }, [selectedResourceId, availableResources])

  const handleSubmit = async () => {
    setError('')

    if (!selectedResourceId) {
      setError('Selecione um recurso')
      return
    }

    const qtd = parseInt(quantidade)
    if (isNaN(qtd) || qtd <= 0) {
      setError('Informe uma quantidade válida')
      return
    }

    if (selectedResource && qtd > selectedResource.quantidade) {
      setError(`Quantidade máxima disponível: ${selectedResource.quantidade} ${selectedResource.unidade}`)
      return
    }

    await onConfirm(selectedResourceId, qtd)
    handleClose()
  }

  const handleClose = () => {
    setSelectedResourceId('')
    setQuantidade('')
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <Modal.Root onClose={handleClose}>
      <Modal.Header title="Dar Baixa em Recurso" onClose={handleClose} />
      <Modal.Content>
        <div className={styles.withdrawModal}>
          <p className={styles.description}>
            Selecione um recurso e informe a quantidade que será retirada do estoque.
          </p>

          {availableResources.length === 0 ? (
            <p className={styles.noData}>
              Não há recursos disponíveis no momento.
            </p>
          ) : (
            <div className={styles.formContent}>
              <div className={styles.formGroup}>
                <label htmlFor="resource" className={styles.label}>
                  Recurso *
                </label>
                <Select
                  id="resource"
                  value={selectedResourceId}
                  onChange={(e) => {
                    setSelectedResourceId(e.target.value)
                    setQuantidade('')
                    setError('')
                  }}
                  disabled={isLoading}
                >
                  <option value="">Selecione um recurso</option>
                  {availableResources.map((resource) => (
                    <option key={resource.id} value={resource.id}>
                      {resource.nome} - {resource.quantidade} {resource.unidade} disponíveis
                    </option>
                  ))}
                </Select>
              </div>

              {selectedResource && (
                <>
                  <div className={styles.resourceInfo}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Categoria:</span>
                      <span className={styles.infoValue}>{selectedResource.categoria}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Disponível:</span>
                      <span className={styles.infoValue}>
                        {selectedResource.quantidade} {selectedResource.unidade}
                      </span>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="quantidade" className={styles.label}>
                      Quantidade a Retirar *
                    </label>
                    <Input
                      id="quantidade"
                      type="number"
                      min="1"
                      max={selectedResource.quantidade}
                      value={quantidade}
                      onChange={(e) => {
                        setQuantidade(e.target.value)
                        setError('')
                      }}
                      placeholder={`Máx: ${selectedResource.quantidade}`}
                      disabled={isLoading}
                    />
                  </div>
                </>
              )}

              {error && <p className={styles.error}>{error}</p>}
            </div>
          )}
        </div>
        <Modal.Actions>
          <Button variant="ghost" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!selectedResourceId || !quantidade || isLoading || availableResources.length === 0}
          >
            {isLoading ? 'Processando...' : 'Confirmar Baixa'}
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal.Root>
  )
}
