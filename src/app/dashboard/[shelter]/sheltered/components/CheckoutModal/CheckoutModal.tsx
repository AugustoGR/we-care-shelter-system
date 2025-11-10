import React, { useState, useMemo } from 'react'

import { ShelteredPerson } from '@/@types/shelteredPersonProps'
import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/ui/button'

import styles from './CheckoutModal.module.scss'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  people: ShelteredPerson[]
  onConfirm: (peopleIds: string[]) => Promise<void>
  isLoading: boolean
}

export function CheckoutModal({
  isOpen,
  onClose,
  people,
  onConfirm,
  isLoading,
}: CheckoutModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar apenas abrigados ativos
  const activePeople = useMemo(() => {
    return people.filter((person) => person.active !== false)
  }, [people])

  // Filtrar abrigados por termo de busca
  const filteredPeople = useMemo(() => {
    if (!searchTerm) return activePeople
    return activePeople.filter((person) =>
      person.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.cpf.includes(searchTerm)
    )
  }, [activePeople, searchTerm])

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedIds.length === filteredPeople.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredPeople.map((person) => person.id))
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
      <Modal.Header title="Checkout de Abrigados" onClose={handleClose} />
      <Modal.Content>
        <div className={styles.checkoutModal}>
          <p className={styles.description}>
            Selecione os abrigados que não estão mais no abrigo para marcá-los como inativos.
          </p>

          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Buscar por nome ou CPF..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {filteredPeople.length === 0 ? (
            <p className={styles.noData}>
              {activePeople.length === 0
                ? 'Não há abrigados ativos no momento.'
                : 'Nenhum abrigado encontrado com esse termo.'}
            </p>
          ) : (
            <>
              <div className={styles.selectAllWrapper}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredPeople.length && filteredPeople.length > 0}
                    onChange={handleSelectAll}
                    className={styles.checkbox}
                  />
                  <span>Selecionar todos ({filteredPeople.length})</span>
                </label>
              </div>

              <div className={styles.animalsList}>
                {filteredPeople.map((person) => (
                  <label key={person.id} className={styles.animalItem}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(person.id)}
                      onChange={() => handleToggle(person.id)}
                      className={styles.checkbox}
                    />
                    <div className={styles.animalInfo}>
                      <span className={styles.animalName}>{person.nome}</span>
                      <span className={styles.animalDetails}>
                        CPF: {person.cpf} • {person.genero}
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
