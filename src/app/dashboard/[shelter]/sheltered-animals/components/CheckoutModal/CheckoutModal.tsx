import React, { useState, useMemo } from 'react'

import { Animal } from '@/@types/animalProps'
import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/ui/button'

import styles from './CheckoutModal.module.scss'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  animals: Animal[]
  onConfirm: (animalIds: string[]) => Promise<void>
  isLoading: boolean
}

export function CheckoutModal({
  isOpen,
  onClose,
  animals,
  onConfirm,
  isLoading,
}: CheckoutModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar apenas animais ativos
  const activeAnimals = useMemo(() => {
    return animals.filter((animal) => animal.active !== false)
  }, [animals])

  // Filtrar animals por termo de busca
  const filteredAnimals = useMemo(() => {
    if (!searchTerm) return activeAnimals
    return activeAnimals.filter((animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.species.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [activeAnimals, searchTerm])

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedIds.length === filteredAnimals.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredAnimals.map((animal) => animal.id))
    }
  }

  const handleSubmit = async () => {
    if (selectedIds.length > 0) {
      await onConfirm(selectedIds)
      setSelectedIds([])
      setSearchTerm('')
      onClose()
    }
  }

  const handleClose = () => {
    setSelectedIds([])
    setSearchTerm('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <Modal.Root onClose={handleClose}>
      <Modal.Header title="Checkout de Animais" onClose={handleClose} />
      <Modal.Content>
        <div className={styles.checkoutModal}>
          <p className={styles.description}>
            Selecione os animais que não estão mais no abrigo para marcá-los como inativos.
          </p>

          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Buscar por nome ou espécie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {filteredAnimals.length === 0 ? (
            <p className={styles.noData}>
              {activeAnimals.length === 0
                ? 'Não há animais ativos no momento.'
                : 'Nenhum animal encontrado com esse termo.'}
            </p>
          ) : (
            <>
              <div className={styles.selectAllWrapper}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredAnimals.length && filteredAnimals.length > 0}
                    onChange={handleSelectAll}
                    className={styles.checkbox}
                  />
                  <span>Selecionar todos ({filteredAnimals.length})</span>
                </label>
              </div>

              <div className={styles.animalsList}>
                {filteredAnimals.map((animal) => (
                  <label key={animal.id} className={styles.animalItem}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(animal.id)}
                      onChange={() => handleToggle(animal.id)}
                      className={styles.checkbox}
                    />
                    <div className={styles.animalInfo}>
                      <span className={styles.animalName}>{animal.name}</span>
                      <span className={styles.animalDetails}>
                        {animal.species} {animal.breed ? `• ${animal.breed}` : ''}
                        {animal.age ? ` • ${animal.age} anos` : ''}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
        <Modal.Actions>
          <Button variant="ghost" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={selectedIds.length === 0 || isLoading}
          >
            {isLoading ? 'Processando...' : `Confirmar Checkout (${selectedIds.length})`}
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal.Root>
  )
}
