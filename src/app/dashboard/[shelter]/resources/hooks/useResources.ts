import React, { useState } from 'react'

import { Resource, MOCK_RESOURCES, INITIAL_FORM } from '../constants/resources'

export const useResources = () => {
  const [resources] = useState<Resource[]>(MOCK_RESOURCES)
  const [search, setSearch] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(
    null,
  )
  const [isDeleting, setIsDeleting] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)

  const filteredResources = resources.filter((item) => {
    const matchNome = item.nome.toLowerCase().includes(search.toLowerCase())
    const matchCategoria = categoriaFiltro
      ? item.categoria === categoriaFiltro
      : true
    return matchNome && matchCategoria
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', form)
    setModalOpen(false)
    setForm(INITIAL_FORM)
  }

  const handleDeleteClick = (resource: Resource) => {
    setResourceToDelete(resource)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!resourceToDelete) return

    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Deleted:', resourceToDelete)
    } catch (error) {
      console.error('Error deleting resource:', error)
    } finally {
      setIsDeleting(false)
      setDeleteModalOpen(false)
      setResourceToDelete(null)
    }
  }

  return {
    resources,
    search,
    setSearch,
    categoriaFiltro,
    setCategoriaFiltro,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    resourceToDelete,
    setResourceToDelete,
    isDeleting,
    form,
    setForm,
    filteredResources,
    handleInputChange,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
  }
}
