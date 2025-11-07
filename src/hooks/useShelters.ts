import { useState, useEffect, useCallback } from 'react'

import { Shelter, ShelterFilters } from '@/@types/shelterProps'
import { sheltersService } from '@/services'
import { getErrorMessage } from '@/utils/errorMessages'

interface UseSheltersReturn {
  shelters: Shelter[]
  loading: boolean
  error: string | null
  loadShelters: () => Promise<void>
  refreshShelters: () => Promise<void>
}

/**
 * Hook personalizado para gerenciar abrigos do usuário
 */
export function useMyShelters(): UseSheltersReturn {
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadShelters = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await sheltersService.findMyShelters()
      setShelters(data)
    } catch (err: any) {
      console.error('Erro ao carregar abrigos:', err)
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadShelters()
  }, [loadShelters])

  return {
    shelters,
    loading,
    error,
    loadShelters,
    refreshShelters: loadShelters,
  }
}

interface UseAllSheltersReturn extends UseSheltersReturn {
  filters: ShelterFilters
  updateFilters: (newFilters: ShelterFilters) => void
}

/**
 * Hook personalizado para gerenciar todos os abrigos com filtros
 */
export function useAllShelters(
  initialFilters?: ShelterFilters,
): UseAllSheltersReturn {
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ShelterFilters>(initialFilters || {})

  const loadShelters = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await sheltersService.findAll(filters)
      setShelters(data)
    } catch (err: any) {
      console.error('Erro ao carregar abrigos:', err)
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadShelters()
  }, [loadShelters])

  return {
    shelters,
    loading,
    error,
    filters,
    updateFilters: setFilters,
    loadShelters,
    refreshShelters: loadShelters,
  }
}

/**
 * Hook personalizado para gerenciar um abrigo específico
 */
export function useShelter(id: string | null) {
  const [shelter, setShelter] = useState<Shelter | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadShelter = useCallback(async () => {
    if (!id) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await sheltersService.findOne(id)
      setShelter(data)
    } catch (err: any) {
      console.error('Erro ao carregar abrigo:', err)
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadShelter()
  }, [loadShelter])

  return {
    shelter,
    loading,
    error,
    refreshShelter: loadShelter,
  }
}
