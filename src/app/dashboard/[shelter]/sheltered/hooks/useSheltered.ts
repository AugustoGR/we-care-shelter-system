import React, { useState } from 'react'

import {
  Sheltered,
  MOCK_SHELTERED,
  INITIAL_FORM,
  PAGE_SIZE,
} from '../constants/sheltered'

export const useSheltered = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [shelteredToDelete, setShelteredToDelete] = useState<Sheltered | null>(
    null,
  )
  const [isDeleting, setIsDeleting] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [generoFilter, setGeneroFilter] = useState('')
  const [idadeFilter, setIdadeFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sheltered, setSheltered] = useState<Sheltered[]>(MOCK_SHELTERED)

  // Filtros
  const filtered = sheltered.filter((item) => {
    const matchSearch =
      item.nome.toLowerCase().includes(search.toLowerCase()) ||
      item.cpf.includes(search)
    const matchStatus = !statusFilter || item.status === statusFilter
    const matchGenero = !generoFilter || item.genero === generoFilter

    // Filtro de idade
    let matchIdade = true
    if (idadeFilter) {
      const today = new Date()
      const birthDate = new Date(
        item.dataNascimento.split('/').reverse().join('-'),
      )
      const age = today.getFullYear() - birthDate.getFullYear()

      if (idadeFilter === '0-17') matchIdade = age >= 0 && age <= 17
      else if (idadeFilter === '18-30') matchIdade = age >= 18 && age <= 30
      else if (idadeFilter === '31-50') matchIdade = age >= 31 && age <= 50
      else if (idadeFilter === '51+') matchIdade = age >= 51
    }

    return matchSearch && matchStatus && matchGenero && matchIdade
  })

  // Configuração de paginação
  const totalItems = filtered.length
  const totalPages = Math.ceil(totalItems / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const paginatedData = filtered.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSheltered([...sheltered, form])
    setForm(INITIAL_FORM)
    setModalOpen(false)
  }

  const handleDeleteClick = (person: Sheltered) => {
    setShelteredToDelete(person)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!shelteredToDelete) return

    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Deleted:', shelteredToDelete)
      setSheltered(sheltered.filter((s) => s.cpf !== shelteredToDelete.cpf))
    } catch (error) {
      console.error('Error deleting sheltered:', error)
    } finally {
      setIsDeleting(false)
      setDeleteModalOpen(false)
      setShelteredToDelete(null)
    }
  }

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('')
    setGeneroFilter('')
    setIdadeFilter('')
  }

  return {
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    shelteredToDelete,
    setShelteredToDelete,
    isDeleting,
    form,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    generoFilter,
    setGeneroFilter,
    idadeFilter,
    setIdadeFilter,
    currentPage,
    paginatedData,
    totalPages,
    totalItems,
    handlePageChange,
    handleInput,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    clearFilters,
  }
}
