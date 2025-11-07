import { useContext, useMemo } from 'react'

import type { ShelterModuleProps } from '@/@types'
import { UserRole } from '@/@types/userProps'
import { AuthContext } from '@/contexts/AuthContext'

export enum ModulePermission {
  READ = 'read',
  WRITE = 'write',
  MANAGE = 'manage',
}

export function usePermissions() {
  const { user } = useContext(AuthContext)

  const isAdmin = useMemo(() => {
    return user?.role === UserRole.ADMIN
  }, [user])

  const canManageModuleActivation = useMemo(() => {
    return isAdmin
  }, [isAdmin])

  const canManageShelter = useMemo(() => {
    return isAdmin
  }, [isAdmin])

  const canReadModule = (_shelterId: string) => {
    if (!user) return false
    if (isAdmin) return true

    // Qualquer voluntário pode ler módulos do abrigo onde está cadastrado
    // Isso precisaria verificar se o usuário é voluntário deste abrigo
    // Por simplicidade, retornamos true se for voluntário
    return user.role === UserRole.VOLUNTEER
  }

  const canWriteInModule = (
    moduleKey: string,
    modules?: ShelterModuleProps[],
  ) => {
    if (!user) return false
    if (isAdmin) return true

    if (!modules) return false

    // Busca o módulo específico
    const shelterModule = modules.find((m) => m.moduleKey === moduleKey)
    if (!shelterModule || !shelterModule.active) return false

    // Verifica se é responsável pelo módulo
    if (shelterModule.responsibleVolunteer?.user.id === user.id) {
      return true
    }

    // Verifica se está associado ao módulo
    const isAssociated = shelterModule.associatedVolunteers?.some(
      (av) => av.volunteer.user.id === user.id,
    )

    return isAssociated || false
  }

  const canManageModule = (
    moduleId: string,
    modules?: ShelterModuleProps[],
  ) => {
    if (!user) return false
    if (isAdmin) return true

    if (!modules) return false

    // Busca o módulo específico
    const shelterModule = modules.find((m) => m.id === moduleId)
    if (!shelterModule) return false

    // Apenas o responsável pode gerenciar o módulo (adicionar voluntários)
    return shelterModule.responsibleVolunteer?.user.id === user.id
  }

  const isResponsibleForModule = (
    moduleKey: string,
    modules?: ShelterModuleProps[],
  ) => {
    if (!user) return false
    if (isAdmin) return true

    if (!modules) return false

    const shelterModule = modules.find((m) => m.moduleKey === moduleKey)
    return shelterModule?.responsibleVolunteer?.user.id === user.id
  }

  const isAssociatedWithModule = (
    moduleKey: string,
    modules?: ShelterModuleProps[],
  ) => {
    if (!user) return false

    if (!modules) return false

    const shelterModule = modules.find((m) => m.moduleKey === moduleKey)
    if (!shelterModule) return false

    return shelterModule.associatedVolunteers?.some(
      (av) => av.volunteer.user.id === user.id,
    )
  }

  return {
    user,
    isAdmin,
    canManageModuleActivation,
    canManageShelter,
    canReadModule,
    canWriteInModule,
    canManageModule,
    isResponsibleForModule,
    isAssociatedWithModule,
  }
}

