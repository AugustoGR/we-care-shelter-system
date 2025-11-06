import React from 'react'

import type { ShelterModuleProps } from '@/@types'
import type { VolunteerProps } from '@/@types/volunteerProps'
import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/ui/button'

import { useManageModule } from '../hooks/useManageModule'
import styles from './ModalForm.module.scss'

interface ModalFormProps {
  isOpen: boolean
  onClose: () => void
  module: {
    key: string
    title: string
    icon: string
  }
  moduleData?: ShelterModuleProps
  volunteers: VolunteerProps[]
  onSave: (data: {
    responsibleVolunteerId?: string
    associatedVolunteerIds: string[]
  }) => Promise<void>
}

export function ModalForm({
  isOpen,
  onClose,
  module,
  moduleData,
  volunteers,
  onSave,
}: ModalFormProps) {
  const {
    responsibleVolunteerId,
    selectedVolunteerIds,
    loading,
    toggleVolunteer,
    handleResponsibleChange,
    handleSave,
  } = useManageModule(moduleData)

  if (!isOpen) return null

  const handleSubmit = async () => {
    const success = await handleSave(onSave)
    if (success) {
      onClose()
    }
  }

  return (
    <Modal.Root onClose={onClose}>
      <Modal.Header title={`Gerenciar ${module.title}`} onClose={onClose} />
      <Modal.Content>
        <div className={styles.section}>
          <label className={styles.label}>
            Voluntário Responsável
            <select
              className={styles.select}
              value={responsibleVolunteerId || ''}
              onChange={(e) => handleResponsibleChange(e.target.value)}
            >
              <option value="">Nenhum</option>
              {volunteers.map((volunteer) => (
                <option key={volunteer.id} value={volunteer.id}>
                  {volunteer.user.name} - {volunteer.phone}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.section}>
          <h3 className={styles.subtitle}>Voluntários Associados</h3>
          <div className={styles.volunteerList}>
            {volunteers.length === 0 ? (
              <p className={styles.emptyMessage}>
                Nenhum voluntário cadastrado
              </p>
            ) : (
              volunteers.map((volunteer) => (
                <label key={volunteer.id} className={styles.volunteerItem}>
                  <input
                    type="checkbox"
                    checked={selectedVolunteerIds.includes(volunteer.id)}
                    onChange={() => toggleVolunteer(volunteer.id)}
                    className={styles.checkbox}
                  />
                  <div className={styles.volunteerInfo}>
                    <span className={styles.volunteerName}>
                      {volunteer.user.name}
                    </span>
                    <span className={styles.volunteerPhone}>
                      {volunteer.phone}
                    </span>
                  </div>
                </label>
              ))
            )}
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </Modal.Footer>
    </Modal.Root>
  )
}
