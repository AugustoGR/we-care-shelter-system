import { useState, useEffect } from 'react'

import type { ShelterModuleProps } from '@/@types'

export const useManageModule = (moduleData?: ShelterModuleProps) => {
  const [responsibleVolunteerId, setResponsibleVolunteerId] = useState<
    string | undefined
  >(undefined)
  const [selectedVolunteerIds, setSelectedVolunteerIds] = useState<string[]>(
    [],
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (moduleData) {
      setResponsibleVolunteerId(moduleData.responsibleVolunteerId || undefined)
      setSelectedVolunteerIds(
        moduleData.associatedVolunteers?.map((av) => av.volunteer.id) || [],
      )
    } else {
      setResponsibleVolunteerId(undefined)
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
    setResponsibleVolunteerId(value || undefined)
  }

  const handleSave = async (
    onSave: (data: {
      responsibleVolunteerId?: string
      associatedVolunteerIds: string[]
    }) => Promise<void>,
  ) => {
    try {
      setLoading(true)
      await onSave({
        responsibleVolunteerId,
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
