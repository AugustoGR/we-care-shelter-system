import React, { useState } from 'react'

import { Volunteer, VOLUNTEERS, INITIAL_FORM } from '../constants/volunteers'

export const useVolunteers = () => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [volunteerToDelete, setVolunteerToDelete] = useState<Volunteer | null>(
    null,
  )
  const [isDeleting, setIsDeleting] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)

  const filtered = VOLUNTEERS.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter ? v.status === statusFilter : true
    return matchSearch && matchStatus
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

  const handleDeleteClick = (volunteer: Volunteer) => {
    setVolunteerToDelete(volunteer)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!volunteerToDelete) return

    setIsDeleting(true)
    try {
      // Simula chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Deleted:', volunteerToDelete)
      // Aqui você chamaria a API real para deletar
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
    handleInputChange,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    clearFilters,
  }
}
