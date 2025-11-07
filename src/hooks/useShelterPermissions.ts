import { useState, useEffect, useCallback } from 'react'

import type { ShelterModuleProps } from '@/@types'
import { shelterModulesService } from '@/services/http/shelterModulesService'
import { sheltersService } from '@/services/http/shelters.service'

interface ShelterPermissions {
  role: string | null
  isAdmin: boolean
  isLoading: boolean
  canManageModuleActivation: boolean
  canManageShelter: boolean
  modules: ShelterModuleProps[]
  userModules: {
    responsible: ShelterModuleProps[]
    associated: ShelterModuleProps[]
  }
  refetch: () => Promise<void>
}

export function useShelterPermissions(shelterId: string): ShelterPermissions {
  const [role, setRole] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [modules, setModules] = useState<ShelterModuleProps[]>([])
  const [userModules, setUserModules] = useState<{
    responsible: ShelterModuleProps[]
    associated: ShelterModuleProps[]
  }>({
    responsible: [],
    associated: [],
  })

  const fetchUserRole = useCallback(async () => {
    if (!shelterId) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const data = await sheltersService.getUserRole(shelterId)
      setRole(data.role)
      setIsAdmin(data.isAdmin)
    } catch (error) {
      console.error('Erro ao buscar permissões do usuário:', error)
      setRole(null)
      setIsAdmin(false)
    } finally {
      setIsLoading(false)
    }
  }, [shelterId])

  const fetchModules = useCallback(async () => {
    if (!shelterId) return

    try {
      const modulesData = await shelterModulesService.getAll(shelterId)
      setModules(modulesData)

      // Filtrar módulos onde o usuário é responsável ou associado
      // Isso será preenchido pelo backend baseado no userId
      // Por enquanto, usamos a estrutura já retornada
      setUserModules({
        responsible: modulesData.filter((m) => m.responsibleVolunteer),
        associated: modulesData.filter(
          (m) => m.associatedVolunteers && m.associatedVolunteers.length > 0,
        ),
      })
    } catch (error) {
      console.error('Erro ao buscar módulos:', error)
    }
  }, [shelterId])

  useEffect(() => {
    fetchUserRole()
    fetchModules()
  }, [fetchUserRole, fetchModules])

  const refetch = useCallback(async () => {
    await Promise.all([fetchUserRole(), fetchModules()])
  }, [fetchUserRole, fetchModules])

  return {
    role,
    isAdmin,
    isLoading,
    canManageModuleActivation: isAdmin,
    canManageShelter: isAdmin,
    modules,
    userModules,
    refetch,
  }
}
