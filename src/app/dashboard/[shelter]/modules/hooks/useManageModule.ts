import { useState, useEffect } from 'react'

import type { ShelterModuleProps } from '@/@types'

export const useManageModule = (moduleData?: ShelterModuleProps) => {
  const [responsibleVolunteerId, setResponsibleVolunteerId] = useState<
    string | null
  >(null)
  const [selectedVolunteerIds, setSelectedVolunteerIds] = useState<string[]>(
    [],
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (moduleData) {
      setResponsibleVolunteerId(moduleData.responsibleVolunteerId || null)
      setSelectedVolunteerIds(
        moduleData.associatedVolunteers?.map((av) => av.volunteer.id) || [],
      )
    } else {
      setResponsibleVolunteerId(null)
      setSelectedVolunteerIds([])
    }
  }, [moduleData])

  const toggleVolunteer = (volunteerId: string) => {
    setSelectedVolunteerIds((prev) => {
      if (prev.includes(volunteerId)) {
        return prev.filter((id) => id !== volunteerId)
      }
      return [...prev, volunteerId]
    })
  }

  const handleResponsibleChange = (value: string) => {
    // Quando selecionar "Nenhum", definir como null ao invés de undefined
    setResponsibleVolunteerId(value || null)
  }

  const handleSave = async (
    onSave: (data: {
      responsibleVolunteerId?: string | null
      associatedVolunteerIds: string[]
    }) => Promise<void>,
  ) => {
    try {
      setLoading(true)
      await onSave({
        responsibleVolunteerId: responsibleVolunteerId || null,
        associatedVolunteerIds: selectedVolunteerIds,
      })
      return true
    } catch (error) {
      console.error('Erro ao salvar módulo:', error)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    responsibleVolunteerId,
    selectedVolunteerIds,
    loading,
    toggleVolunteer,
    handleResponsibleChange,
    handleSave,
  }
}
