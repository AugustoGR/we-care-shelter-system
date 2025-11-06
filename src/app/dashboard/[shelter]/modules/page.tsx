'use client'
import React, { useState, useEffect, useCallback } from 'react'

import { useParams } from 'next/navigation'

import type { VolunteerProps } from '@/@types/volunteerProps'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { shelterModulesService } from '@/services/http/shelterModulesService'
import { volunteersService } from '@/services/http/volunteers.service'

import { ModalForm } from './components/ModalForm'
import { useModules } from './hooks/useModules'
import styles from './Modules.module.scss'

export default function ModulesPage() {
  const params = useParams()
  const shelterId = params.shelter as string

  const { modules, moduleStates, handleToggle, getModuleData, reloadModules } =
    useModules()

  const [volunteers, setVolunteers] = useState<VolunteerProps[]>([])
  const [selectedModule, setSelectedModule] = useState<{
    key: string
    title: string
    icon: string
  } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadVolunteers = useCallback(async () => {
    try {
      const data = await volunteersService.findAll(shelterId)
      setVolunteers(data)
    } catch (error) {
      console.error('Erro ao carregar voluntários:', error)
    }
  }, [shelterId])

  useEffect(() => {
    loadVolunteers()
  }, [loadVolunteers])

  const handleManageClick = (mod: {
    key: string
    title: string
    icon: string
  }) => {
    setSelectedModule(mod)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedModule(null)
  }

  const handleSaveModule = async (data: {
    responsibleVolunteerId?: string
    associatedVolunteerIds: string[]
  }) => {
    if (!selectedModule) return

    try {
      const moduleData = getModuleData(selectedModule.key)

      if (moduleData) {
        // Atualizar módulo existente
        await shelterModulesService.update(shelterId, moduleData.id, data)
      }

      await reloadModules()
    } catch (error) {
      console.error('Erro ao salvar módulo:', error)
      throw error
    }
  }

  return (
    <>
      <h1 className={styles.title}>Ativação de Módulos</h1>
      <p className={styles.subtitle}>
        Gerencie a ativação e desativação dos módulos funcionais do sistema
        Abrigo Emergencial. Cada módulo pode ser ligado ou desligado para
        adaptar as funcionalidades do abrigo conforme necessário.
      </p>
      <div className={styles.grid}>
        {modules.map((mod) => {
          const moduleData = getModuleData(mod.key)

          return (
            <div key={mod.key} className={styles.card}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{mod.icon}</span>
              </div>
              <h2 className={styles.cardTitle}>{mod.title}</h2>
              <div className={styles.cardDesc}>
                <p>{mod.desc}</p>
              </div>

              {moduleData?.responsibleVolunteer && (
                <div className={styles.responsibleInfo}>
                  <strong>Responsável:</strong>{' '}
                  {moduleData.responsibleVolunteer.user.name}
                </div>
              )}

              {moduleData?.associatedVolunteers &&
              moduleData.associatedVolunteers.length > 0 ? (
                  <div className={styles.associatedInfo}>
                    <strong>Voluntários:</strong>{' '}
                    {moduleData.associatedVolunteers.length}
                  </div>
                ) : null}

              <div className={styles.cardFooter}>
                <div className={styles.statusWrapper}>
                  <Switch
                    checked={moduleStates[mod.key]}
                    onCheckedChange={() => handleToggle(mod.key)}
                  />
                  <span
                    className={
                      moduleStates[mod.key]
                        ? styles.statusTextActive
                        : styles.statusTextInactive
                    }
                  >
                    {moduleStates[mod.key] ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <Button
                  className={styles.manageBtn}
                  onClick={() => handleManageClick(mod)}
                >
                  Gerenciar
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {selectedModule && (
        <ModalForm
          isOpen={isModalOpen}
          onClose={handleModalClose}
          module={selectedModule}
          moduleData={getModuleData(selectedModule.key)}
          volunteers={volunteers}
          onSave={handleSaveModule}
        />
      )}
    </>
  )
}
