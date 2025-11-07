import { useState, useEffect, useCallback } from 'react'

import { useParams } from 'next/navigation'

import type { ShelterModuleProps } from '@/@types'
import { shelterModulesService } from '@/services/http/shelterModulesService'

import { MODULES } from '../constants/modules'

export const useModules = () => {
  const params = useParams()
  const shelterId = params.shelter as string

  const [moduleStates, setModuleStates] = useState<Record<string, boolean>>(
    MODULES.reduce(
      (acc, mod) => ({ ...acc, [mod.key]: mod.active }),
      {} as Record<string, boolean>,
    ),
  )
  const [modulesData, setModulesData] = useState<ShelterModuleProps[]>([])
  const [loading, setLoading] = useState(true)

  const loadModules = useCallback(async () => {
    try {
      setLoading(true)
      const modules = await shelterModulesService.getAll(shelterId)
      setModulesData(modules)

      // Atualizar os estados dos módulos
      const states = modules.reduce(
        (acc, mod) => ({ ...acc, [mod.moduleKey]: mod.active }),
        {} as Record<string, boolean>,
      )
      setModuleStates(states)
    } catch (error) {
      console.error('Erro ao carregar módulos:', error)
    } finally {
      setLoading(false)
    }
  }, [shelterId])

  useEffect(() => {
    if (shelterId) {
      loadModules()
    }
  }, [shelterId, loadModules])

  const handleToggle = async (key: string) => {
    try {
      // Encontrar o módulo no backend
      const moduleData = modulesData.find((m) => m.moduleKey === key)

      if (moduleData) {
        // Atualizar no backend
        await shelterModulesService.toggleActive(shelterId, moduleData.id)

        // Atualizar estado local
        setModuleStates((prev) => ({ ...prev, [key]: !prev[key] }))

        // Recarregar módulos para sincronizar
        await loadModules()
      }
    } catch (error: any) {
      console.error('Erro ao alternar módulo:', error)

      // Se for erro 403, lançar para ser tratado pelo componente
      if (error.response?.status === 403) {
        throw error
      }
    }
  }

  const getModuleData = (key: string): ShelterModuleProps | undefined => {
    return modulesData.find((m) => m.moduleKey === key)
  }

  return {
    modules: MODULES,
    moduleStates,
    modulesData,
    loading,
    handleToggle,
    getModuleData,
    reloadModules: loadModules,
  }
}
