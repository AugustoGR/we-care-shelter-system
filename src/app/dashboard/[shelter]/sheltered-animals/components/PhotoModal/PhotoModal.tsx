'use client'
import React from 'react'

import { Modal } from '@/components/layout/Modal'

import styles from '../../ShelteredAnimals.module.scss'

interface PhotoModalProps {
  isOpen: boolean
  onClose: () => void
  photoUrl: string
  animalName: string
}

export function PhotoModal({
  isOpen,
  onClose,
  photoUrl,
  animalName,
}: PhotoModalProps) {
  if (!isOpen) return null

  return (
    <Modal.Root onClose={onClose}>
      <div className={styles.photoModal}>
        <Modal.Header title={`Foto de ${animalName}`} onClose={onClose} />

        <div className={styles.photoContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoUrl} alt={`Foto de ${animalName}`} />
        </div>

        <div className={styles.photoFooter}>
          <p>Clique fora da imagem ou no × para fechar</p>
        </div>
      </div>
    </Modal.Root>
  )
}
