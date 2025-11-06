import { useState, useEffect } from 'react'

import type { ShelterModuleProps } from '@/@types'
import { shelterModulesService } from '@/services/http/shelterModulesService'

export const useShelterModules = (shelterId: string | null) => {
  const [modules, setModules] = useState<ShelterModuleProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!shelterId) {
      setModules([])
      setLoading(false)
      return
    }

    const loadModules = async () => {
      try {
        setLoading(true)
        const data = await shelterModulesService.getAll(shelterId)
        setModules(data)
      } catch (error) {
        console.error('Erro ao carregar módulos:', error)
        setModules([])
      } finally {
        setLoading(false)
      }
    }

    loadModules()
  }, [shelterId])

  const isModuleActive = (moduleKey: string): boolean => {
    const moduleData = modules.find((m) => m.moduleKey === moduleKey)
    return moduleData?.active ?? true // Se não encontrar, assume ativo
  }

  return {
    modules,
    loading,
    isModuleActive,
  }
}
