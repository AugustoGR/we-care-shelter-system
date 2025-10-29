import React, { useState } from 'react'

import { Animal, ANIMALS, INITIAL_FORM } from '../constants/animals'

export const useShelteredAnimals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)
  const [search, setSearch] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState('')

  const filtered = ANIMALS.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.species.toLowerCase().includes(search.toLowerCase()) ||
      a.breed.toLowerCase().includes(search.toLowerCase())
    const matchSpecies = speciesFilter ? a.species === speciesFilter : true
    return matchSearch && matchSpecies
  })

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', form)
    setIsModalOpen(false)
    setForm(INITIAL_FORM)
  }

  const handleDeleteClick = (animal: Animal) => {
    setAnimalToDelete(animal)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!animalToDelete) return

    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Deleted:', animalToDelete)
    } catch (error) {
      console.error('Error deleting animal:', error)
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
    form,
    setForm,
    search,
    setSearch,
    speciesFilter,
    setSpeciesFilter,
    filtered,
    handleInputChange,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCheckboxChange,
    handleFileChange,
    clearFilters,
  }
}
