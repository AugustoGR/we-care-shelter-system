import React, { useState, useEffect, useCallback } from 'react'

import { useParams } from 'next/navigation'

import { Animal } from '@/@types/animalProps'
import { animalsService } from '@/services'

import { INITIAL_FORM } from '../constants/animals'

export const useShelteredAnimals = () => {
  const params = useParams()
  const shelterId = params.shelter as string

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [animals, setAnimals] = useState<Animal[]>([])
  const [form, setForm] = useState(INITIAL_FORM)
  const [search, setSearch] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Carregar animais do abrigo
  const loadAnimals = useCallback(async () => {
    if (!shelterId) return

    try {
      setIsLoading(true)
      setError(null)
      const data = await animalsService.findByShelterId(shelterId)
      setAnimals(data)
    } catch (err: any) {
      console.error('Error loading animals:', err)
      setError(err.response?.data?.message || 'Erro ao carregar animais')
    } finally {
      setIsLoading(false)
    }
  }, [shelterId])

  useEffect(() => {
    loadAnimals()
  }, [loadAnimals])

  const filtered = animals.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.species.toLowerCase().includes(search.toLowerCase()) ||
      (a.breed?.toLowerCase() || '').includes(search.toLowerCase())
    const matchSpecies = speciesFilter ? a.species === speciesFilter : true
    return matchSearch && matchSpecies
  })

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    console.log('handleInputChange:', { name, value }) // Debug
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSaving(true)
      setError(null)

      console.log('Form data before submit:', form) // Debug

      // Converter age para number se preenchido
      const age = form.age ? parseInt(form.age) : undefined

      // Por enquanto, não vamos fazer upload de foto
      // Você pode implementar isso posteriormente
      const animalData = {
        name: form.name,
        species: form.species,
        breed: form.breed || undefined,
        age,
        sex: form.sex,
        health: form.health,
        care: form.care || undefined,
        rabies: form.rabies,
        cinomose: form.cinomose,
        parvo: form.parvo,
        felina: form.felina,
        status: form.health, // Status inicial baseado na saúde
        shelterId,
      }

      console.log('Animal data to send:', animalData) // Debug

      await animalsService.create(animalData)

      // Recarregar lista
      await loadAnimals()

      // Fechar modal e resetar form
      setIsModalOpen(false)
      setForm(INITIAL_FORM)
    } catch (err: any) {
      console.error('Error creating animal:', err)
      setError(err.response?.data?.message || 'Erro ao criar animal')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteClick = (animal: Animal) => {
    setAnimalToDelete(animal)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!animalToDelete) return

    setIsDeleting(true)
    try {
      await animalsService.delete(animalToDelete.id)

      // Recarregar lista
      await loadAnimals()
    } catch (err: any) {
      console.error('Error deleting animal:', err)
      setError(err.response?.data?.message || 'Erro ao deletar animal')
    } finally {
      setIsDeleting(false)
      setDeleteModalOpen(false)
      setAnimalToDelete(null)
    }
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setForm((f) => ({ ...f, [field]: checked }))
  }

  const handleFileChange = (file: File | null) => {
    setForm((f) => ({ ...f, photo: file }))
  }

  const clearFilters = () => {
    setSearch('')
    setSpeciesFilter('')
  }

  return {
    isModalOpen,
    setIsModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    animalToDelete,
    setAnimalToDelete,
    isDeleting,
    isLoading,
    isSaving,
    error,
    form,
    setForm,
    search,
    setSearch,
    speciesFilter,
    setSpeciesFilter,
    filtered,
    animals,
    handleInputChange,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCheckboxChange,
    handleFileChange,
    clearFilters,
    loadAnimals,
  }
}
