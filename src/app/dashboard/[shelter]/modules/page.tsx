'use client'
import React, { useState, useEffect, useCallback } from 'react'

import { useParams } from 'next/navigation'

import type { VolunteerProps } from '@/@types/volunteerProps'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/contexts/AuthContext'
import { useErrorHandler, usePermissions, useShelterPermissions } from '@/hooks'
import { shelterModulesService } from '@/services/http/shelterModulesService'
import { volunteersService } from '@/services/http/volunteers.service'
import { SUCCESS_MESSAGES } from '@/utils/errorMessages'

import { ModalForm } from './components/ModalForm'
import { useModules } from './hooks/useModules'
import styles from './Modules.module.scss'

export default function ModulesPage() {
  const params = useParams()
  const shelterId = params.shelter as string
  const { user } = useAuth()
  const { handleError, handleSuccess } = useErrorHandler()
  const {
    canManageModuleActivation,
    isAdmin,
    modules: permissionModules,
    isLoading: permissionsLoading,
  } = useShelterPermissions(shelterId)
  const { canManageModule } = usePermissions()

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
      handleError(error)
    }
  }, [shelterId, handleError])

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
      handleSuccess(SUCCESS_MESSAGES.UPDATED)
    } catch (error) {
      console.error('Erro ao salvar módulo:', error)
      handleError(error)
      throw error
    }
  }

  const handleToggleWithPermissionCheck = async (key: string) => {
    try {
      await handleToggle(key)
    } catch (error: any) {
      // Trata especificamente erro 403 de permissão
      if (error.response?.status === 403) {
        handleError(
          new Error(
            'Você não tem permissão para ativar/desativar módulos. Apenas administradores do abrigo podem realizar esta ação.',
          ),
        )
      } else {
        handleError(error)
      }
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
      {!permissionsLoading && !canManageModuleActivation && (
        <div className={styles.permissionWarning}>
          <p>
            ⚠️ Você não tem permissão para ativar/desativar módulos. Apenas
            administradores do abrigo podem realizar esta ação.
          </p>
        </div>
      )}
      <div className={styles.grid}>
        {modules.map((mod) => {
          const moduleData = getModuleData(mod.key)
          const userIsResponsible =
            moduleData?.responsibleVolunteer?.user?.id === user?.id
          const userCanManage = canManageModule(mod.key, permissionModules)

          // Mostra o card apenas se:
          // 1. Usuário é admin
          // 2. Usuário é responsável por este módulo
          // 3. Usuário está associado a este módulo
          if (!isAdmin && !userCanManage && !userIsResponsible) {
            return null
          }

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
                {/* Switch de ativação - apenas para admins */}
                {canManageModuleActivation && (
                  <div className={styles.statusWrapper}>
                    <Switch
                      checked={moduleStates[mod.key]}
                      onCheckedChange={() =>
                        handleToggleWithPermissionCheck(mod.key)
                      }
                      disabled={permissionsLoading}
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
                )}

                {/* Status para não-admins */}
                {!canManageModuleActivation && (
                  <div className={styles.statusWrapper}>
                    <span
                      className={
                        moduleStates[mod.key]
                          ? styles.statusTextActive
                          : styles.statusTextInactive
                      }
                    >
                      {moduleStates[mod.key] ? '✓ Ativo' : '✗ Inativo'}
                    </span>
                  </div>
                )}

                {/* Botão gerenciar - apenas para responsáveis e admins */}
                {(isAdmin || userIsResponsible) && (
                  <Button
                    className={styles.manageBtn}
                    onClick={() => handleManageClick(mod)}
                  >
                    Gerenciar
                  </Button>
                )}
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
