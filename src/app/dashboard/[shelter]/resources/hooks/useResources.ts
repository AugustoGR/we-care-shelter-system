'use client'

import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react'

import moment from 'moment'
import { useParams } from 'next/navigation'

import { ResourceProps } from '@/@types'
import { useAuth } from '@/contexts/AuthContext'
import {
  useErrorHandler,
  useModuleDisclaimer,
  usePermissions,
  useShelterPermissions,
} from '@/hooks'
import { resourcesService } from '@/services'
import { SUCCESS_MESSAGES } from '@/utils/errorMessages'

import { INITIAL_FORM } from '../constants/resources'

export const useResources = () => {
  const params = useParams()
  const shelterId = params?.shelter as string
  const { user } = useAuth()
  const { handleError, handleSuccess } = useErrorHandler()
  const { modules: permissionModules, isAdmin } = useShelterPermissions(shelterId)
  const { canWriteInModule } = usePermissions()
  const {
    isDisclaimerOpen,
    disclaimerModule,
    openDisclaimer,
    closeDisclaimer,
  } = useModuleDisclaimer()

  // Verificar permissões
  const userCanWrite = isAdmin || canWriteInModule('resources', permissionModules)

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

  // Estados para modal de baixa
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  // Carregar recursos ao montar o componente
  const loadResources = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await resourcesService.findByShelterId(shelterId)
      setResources(data)
    } catch (error) {
      console.error('Error loading resources:', error)
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }, [shelterId, handleError])

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
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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

  const handleSubmit = async (e: FormEvent) => {
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
        handleSuccess(SUCCESS_MESSAGES.UPDATED)
      } else {
        // Criar novo recurso
        await resourcesService.create({
          ...form,
          quantidade,
          shelterId,
        })
        handleSuccess(SUCCESS_MESSAGES.CREATED)
      }

      setModalOpen(false)
      setForm(INITIAL_FORM)
      setIsEditMode(false)
      setResourceToEdit(null)
      await loadResources()
    } catch (error) {
      console.error('Error saving resource:', error)
      handleError(error)
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
      handleSuccess(SUCCESS_MESSAGES.DELETED)
      await loadResources()
    } catch (error) {
      console.error('Error deleting resource:', error)
      handleError(error)
    } finally {
      setIsDeleting(false)
      setDeleteModalOpen(false)
      setResourceToDelete(null)
    }
  }

  const clearFilters = () => {
    setSearch('')
    setCategoriaFiltro('')
  }

  const handleWithdraw = async (resourceId: string, quantidade: number) => {
    setIsWithdrawing(true)
    try {
      await resourcesService.withdraw(resourceId, quantidade, shelterId)
      handleSuccess('Baixa realizada com sucesso!')

      // Recarregar lista
      await loadResources()
      setWithdrawModalOpen(false)
    } catch (error: any) {
      console.error('Error withdrawing resource:', error)
      handleError(error)
    } finally {
      setIsWithdrawing(false)
    }
  }

  return {
    // Estados
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

    // Estados de modal de baixa
    withdrawModalOpen,
    setWithdrawModalOpen,
    isWithdrawing,

    // Permissões
    userCanWrite,
    isAdmin,
    user,

    // Disclaimer
    isDisclaimerOpen,
    disclaimerModule,
    openDisclaimer,
    closeDisclaimer,

    // Handlers
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDeleteClick,
    handleDeleteConfirm,
    clearFilters,
    handleWithdraw,
  }
}
