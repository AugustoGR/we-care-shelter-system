'use client'

import React, { useState, useEffect, useCallback } from 'react'

import moment from 'moment'
import { useParams } from 'next/navigation'

import { ResourceProps } from '@/@types'
import { resourcesService } from '@/services'

import { INITIAL_FORM } from '../constants/resources'

export const useResources = () => {
  const params = useParams()
  const shelterId = params?.shelter as string

  const [resources, setResources] = useState<ResourceProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [resourceToEdit, setResourceToEdit] = useState<ResourceProps | null>(null)
  const [resourceToDelete, setResourceToDelete] = useState<ResourceProps | null>(
    null,
  )
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)

  // Carregar recursos ao montar o componente
  const loadResources = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await resourcesService.findByShelterId(shelterId)
      setResources(data)
    } catch (error) {
      console.error('Error loading resources:', error)
    } finally {
      setIsLoading(false)
    }
  }, [shelterId])

  useEffect(() => {
    if (shelterId) {
      loadResources()
    }
  }, [shelterId, loadResources])

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

  const handleEdit = (resource: ResourceProps) => {
    setIsEditMode(true)
    setResourceToEdit(resource)
    setForm({
      nome: resource.nome,
      categoria: resource.categoria,
      quantidade: String(resource.quantidade),
      unidade: resource.unidade,
      validade: resource.validade
        ? moment.utc(resource.validade).format('YYYY-MM-DD')
        : '',
      status: resource.status,
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      const quantidade = parseInt(form.quantidade, 10)

      if (isEditMode && resourceToEdit) {
        // Atualizar recurso existente
        await resourcesService.update(resourceToEdit.id, {
          ...form,
          quantidade,
        })
      } else {
        // Criar novo recurso
        await resourcesService.create({
          ...form,
          quantidade,
          shelterId,
        })
      }

      setModalOpen(false)
      setForm(INITIAL_FORM)
      setIsEditMode(false)
      setResourceToEdit(null)
      await loadResources()
    } catch (error) {
      console.error('Error saving resource:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteClick = (resource: ResourceProps) => {
    setResourceToDelete(resource)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!resourceToDelete) return

    setIsDeleting(true)
    try {
      await resourcesService.remove(resourceToDelete.id)
      await loadResources()
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
    isLoading,
    search,
    setSearch,
    categoriaFiltro,
    setCategoriaFiltro,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    isEditMode,
    resourceToEdit,
    resourceToDelete,
    setResourceToDelete,
    isDeleting,
    isSubmitting,
    form,
    setForm,
    filteredResources,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDeleteClick,
    handleDeleteConfirm,
  }
}
