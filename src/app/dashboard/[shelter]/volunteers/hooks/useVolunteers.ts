import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react'

import { useParams } from 'next/navigation'

import { VolunteerProps } from '@/@types/volunteerProps'
import { useAuth } from '@/contexts/AuthContext'
import {
  useErrorHandler,
  useModuleDisclaimer,
  usePermissions,
  useShelterPermissions,
} from '@/hooks'
import { volunteersService } from '@/services'
import { SUCCESS_MESSAGES } from '@/utils/errorMessages'

import { INITIAL_FORM } from '../constants/volunteers'

export const useVolunteers = () => {
  const params = useParams()
  const shelterId = params?.shelter as string
  const { user } = useAuth()
  const { handleError, handleSuccess } = useErrorHandler()
  const { modules: permissionModules, isAdmin } =
    useShelterPermissions(shelterId)
  const { canWriteInModule } = usePermissions()
  const {
    isDisclaimerOpen,
    disclaimerModule,
    openDisclaimer,
    closeDisclaimer,
  } = useModuleDisclaimer()

  // Verificar permissões
  const userCanWrite =
    isAdmin || canWriteInModule('volunteers', permissionModules)

  const [volunteers, setVolunteers] = useState<VolunteerProps[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [volunteerToEdit, setVolunteerToEdit] = useState<VolunteerProps | null>(null)
  const [volunteerToDelete, setVolunteerToDelete] =
    useState<VolunteerProps | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)

  // Carregar voluntários do abrigo
  const loadVolunteers = useCallback(async () => {
    try {
      setLoading(true)
      const data = await volunteersService.findAll(shelterId)
      setVolunteers(data)
    } catch (error) {
      console.error('Error loading volunteers:', error)
      handleError(error)
    } finally {
      setLoading(false)
    }
  }, [shelterId, handleError])

  useEffect(() => {
    if (shelterId) {
      loadVolunteers()
    }
  }, [shelterId, loadVolunteers])

  const filtered = volunteers.filter((v) => {
    const matchSearch =
      v.user.name.toLowerCase().includes(search.toLowerCase()) ||
      v.user.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter ? v.status === statusFilter : true
    return matchSearch && matchStatus
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUserSelect = (
    userId: string,
    _userName: string,
    _userEmail: string
  ) => {
    setForm({ ...form, userId })
  }

  const handleEdit = (volunteer: VolunteerProps) => {
    setIsEditMode(true)
    setVolunteerToEdit(volunteer)
    setForm({
      userId: volunteer.userId,
      phone: volunteer.phone,
      skills: volunteer.skills.join(', '),
      status: volunteer.status,
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      const skills = form.skills
        ? form.skills.split(',').map((s) => s.trim())
        : []

      if (isEditMode && volunteerToEdit) {
        // Atualizar voluntário existente
        await volunteersService.update(volunteerToEdit.id, {
          phone: form.phone,
          skills,
          status: form.status,
        })
        handleSuccess(SUCCESS_MESSAGES.UPDATED)
      } else {
        // Criar novo voluntário
        await volunteersService.create({
          userId: form.userId,
          phone: form.phone,
          skills,
          status: form.status,
          shelterId,
        })
        handleSuccess(SUCCESS_MESSAGES.CREATED)
      }

      setModalOpen(false)
      setForm(INITIAL_FORM)
      setIsEditMode(false)
      setVolunteerToEdit(null)
      await loadVolunteers()
    } catch (error) {
      console.error('Error saving volunteer:', error)
      handleError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteClick = (volunteer: VolunteerProps) => {
    setVolunteerToDelete(volunteer)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!volunteerToDelete) return

    setIsDeleting(true)
    try {
      await volunteersService.remove(volunteerToDelete.id)
      handleSuccess(SUCCESS_MESSAGES.DELETED)
      await loadVolunteers()
    } catch (error) {
      console.error('Error deleting volunteer:', error)
      handleError(error)
    } finally {
      setIsDeleting(false)
      setDeleteModalOpen(false)
      setVolunteerToDelete(null)
    }
  }

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('')
  }

  return {
    // Permissões
    user,
    isAdmin,
    userCanWrite,

    // Disclaimer
    isDisclaimerOpen,
    disclaimerModule,
    openDisclaimer,
    closeDisclaimer,

    // Dados
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    form,
    filtered,

    // Estados de UI
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    isEditMode,
    volunteerToEdit,
    volunteerToDelete,
    setVolunteerToDelete,

    // Estados de carregamento
    isDeleting,
    isSubmitting,
    loading,

    // Funções
    handleInputChange,
    handleUserSelect,
    handleEdit,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    clearFilters,
  }
}
