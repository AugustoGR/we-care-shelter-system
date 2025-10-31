import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react'

import { useParams } from 'next/navigation'

import { VolunteerProps } from '@/@types/volunteerProps'
import { volunteersService } from '@/services'

import { INITIAL_FORM } from '../constants/volunteers'

export const useVolunteers = () => {
  const params = useParams()
  const shelterId = params?.shelter as string

  const [volunteers, setVolunteers] = useState<VolunteerProps[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [volunteerToDelete, setVolunteerToDelete] =
    useState<VolunteerProps | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)

  // Carregar voluntários do abrigo
  const loadVolunteers = useCallback(async () => {
    try {
      setLoading(true)
      const data = await volunteersService.findAll(shelterId)
      setVolunteers(data)
    } catch (error) {
      console.error('Error loading volunteers:', error)
    } finally {
      setLoading(false)
    }
  }, [shelterId])

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const skills = form.skills
        ? form.skills.split(',').map((s) => s.trim())
        : []

      await volunteersService.create({
        userId: form.userId,
        phone: form.phone,
        skills,
        status: form.status,
        shelterId,
      })

      setModalOpen(false)
      setForm(INITIAL_FORM)
      await loadVolunteers()
    } catch (error) {
      console.error('Error creating volunteer:', error)
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
      await loadVolunteers()
    } catch (error) {
      console.error('Error deleting volunteer:', error)
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
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    volunteerToDelete,
    setVolunteerToDelete,
    isDeleting,
    form,
    filtered,
    loading,
    handleInputChange,
    handleUserSelect,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    clearFilters,
  }
}
