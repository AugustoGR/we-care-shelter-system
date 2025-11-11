'use client'

import React from 'react'

import { VolunteerInvitationProps, InvitationResponse } from '@/@types'
import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/ui/button'

import styles from './NotificationModal.module.scss'

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  invitations: VolunteerInvitationProps[]
  onRespond: (invitationId: string, response: InvitationResponse) => Promise<void>
  isResponding: boolean
}

export function NotificationModal({
  isOpen,
  onClose,
  invitations,
  onRespond,
  isResponding,
}: NotificationModalProps) {
  const [selectedInvitation, setSelectedInvitation] =
    React.useState<VolunteerInvitationProps | null>(null)

  const handleAccept = async () => {
    if (!selectedInvitation) return
    await onRespond(selectedInvitation.id, InvitationResponse.ACCEPTED)
    setSelectedInvitation(null)
  }

  const handleReject = async () => {
    if (!selectedInvitation) return
    await onRespond(selectedInvitation.id, InvitationResponse.REJECTED)
    setSelectedInvitation(null)
  }

  const handleClose = () => {
    setSelectedInvitation(null)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <Modal.Root onClose={handleClose}>
          <Modal.Header title="Notificações" onClose={handleClose} />
          <Modal.Content>
            {invitations.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Você não tem notificações pendentes</p>
              </div>
            ) : selectedInvitation ? (
              <div className={styles.invitationDetails}>
                <h3>Convite para ser Voluntário</h3>
                <div className={styles.shelterInfo}>
                  <h4>{selectedInvitation.shelter.name}</h4>
                  <p className={styles.location}>
                    {selectedInvitation.shelter.city},{' '}
                    {selectedInvitation.shelter.state}
                  </p>
                  {selectedInvitation.shelter.description && (
                    <p className={styles.description}>
                      {selectedInvitation.shelter.description}
                    </p>
                  )}
                </div>
                <div className={styles.message}>
                  <p>
                    Você foi convidado(a) para se tornar voluntário(a) neste
                    abrigo. Ao aceitar, você poderá colaborar com as atividades
                    e ajudar a comunidade afetada.
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.invitationsList}>
                {invitations.map((invitation) => (
                  <div
                    key={invitation.id}
                    className={styles.invitationCard}
                    onClick={() => setSelectedInvitation(invitation)}
                  >
                    <div className={styles.cardHeader}>
                      <h4>{invitation.shelter.name}</h4>
                      <span className={styles.badge}>Convite</span>
                    </div>
                    <p className={styles.cardLocation}>
                      {invitation.shelter.city}, {invitation.shelter.state}
                    </p>
                    <button className={styles.viewButton}>Ver convite →</button>
                  </div>
                ))}
              </div>
            )}
          </Modal.Content>
          {selectedInvitation && (
            <Modal.Footer>
              <Modal.Actions>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleReject}
                  disabled={isResponding}
                >
                  Recusar
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleAccept}
                  disabled={isResponding}
                >
                  {isResponding ? 'Processando...' : 'Aceitar'}
                </Button>
              </Modal.Actions>
            </Modal.Footer>
          )}
        </Modal.Root>
      )}
    </>
  )
}
