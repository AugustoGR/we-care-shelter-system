'use client'

import { useState, useEffect, useCallback } from 'react'

import moment from 'moment'
import { useParams } from 'next/navigation'

import {
  ShelteredPerson,
  CreateShelteredPersonData,
  UpdateShelteredPersonData,
} from '@/@types/shelteredPersonProps'
import { useAuth } from '@/contexts/AuthContext'
import {
  useErrorHandler,
  useModuleDisclaimer,
  usePermissions,
  useShelterPermissions,
} from '@/hooks'
import { shelteredPeopleService } from '@/services'
import { getErrorMessage, SUCCESS_MESSAGES } from '@/utils/errorMessages'

import {
  INITIAL_FORM,
  STATUS_OPTIONS,
  GENERO_OPTIONS,
  IDADE_OPTIONS,
  PAGE_SIZE,
} from '../constants/sheltered'

type FormData = Omit<CreateShelteredPersonData, 'shelterId'>

export const useSheltered = () => {
  const params = useParams()
  const shelterId = params.shelter as string
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
  const userCanWrite =
    isAdmin || canWriteInModule('sheltered_people', permissionModules)

  const [sheltered, setSheltered] = useState<ShelteredPerson[]>([])
  const [filteredSheltered, setFilteredSheltered] = useState<ShelteredPerson[]>(
    [],
  )
  const [currentPage, setCurrentPage] = useState(1)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedSheltered, setSelectedSheltered] =
    useState<ShelteredPerson | null>(null)

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)

  const [filterStatus, setFilterStatus] = useState('')
  const [filterGenero, setFilterGenero] = useState('')
  const [filterIdade, setFilterIdade] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estados para modal de checkout
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  /**
   * Carregar os abrigados do abrigo
   */
  const loadSheltered = useCallback(async () => {
    if (!shelterId) return

    try {
      setIsLoading(true)
      setError(null)
      const data = await shelteredPeopleService.findByShelterId(shelterId)
      setSheltered(data)
      setFilteredSheltered(data)
    } catch (err) {
      console.error('Erro ao carregar abrigados:', err)
      const errorMsg = getErrorMessage(err)
      setError(errorMsg)
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }, [shelterId, handleError])

  /**
   * Carregar dados ao montar o componente
   */
  useEffect(() => {
    loadSheltered()
  }, [loadSheltered])

  /**
   * Calcular a idade a partir da data de nascimento
   */
  const calculateAge = (birthDate: string): number => {
    const today = moment()
    const birth = moment.utc(birthDate)
    return today.diff(birth, 'years')
  }

  /**
   * Verificar se a idade está na faixa especificada
   */
  const isInAgeRange = (age: number, range: string): boolean => {
    switch (range) {
      case '0-18':
        return age >= 0 && age <= 18
      case '19-30':
        return age >= 19 && age <= 30
      case '31-50':
        return age >= 31 && age <= 50
      case '51+':
        return age >= 51
      default:
        return true
    }
  }

  /**
   * Aplicar filtros aos abrigados
   */
  useEffect(() => {
    let filtered = sheltered

    // Filtro de busca por nome ou CPF
    if (searchValue) {
      const searchLower = searchValue.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.nome.toLowerCase().includes(searchLower) ||
          s.cpf.includes(searchValue),
      )
    }

    if (filterStatus) {
      filtered = filtered.filter((s) => s.status === filterStatus)
    }

    if (filterGenero) {
      filtered = filtered.filter((s) => s.genero === filterGenero)
    }

    if (filterIdade) {
      filtered = filtered.filter((s) => {
        const age = calculateAge(s.dataNascimento)
        return isInAgeRange(age, filterIdade)
      })
    }

    setFilteredSheltered(filtered)
  }, [sheltered, searchValue, filterStatus, filterGenero, filterIdade])

  /**
   * Abrir modal para adicionar novo abrigado
   */
  const handleAdd = () => {
    setIsEditMode(false)
    setSelectedSheltered(null)
    setFormData(INITIAL_FORM)
    setIsModalOpen(true)
  }

  /**
   * Abrir modal para editar abrigado
   */
  const handleEdit = (person: ShelteredPerson) => {
    setIsEditMode(true)
    setSelectedSheltered(person)
    setFormData({
      nome: person.nome,
      cpf: person.cpf,
      dataNascimento: moment.utc(person.dataNascimento).format('YYYY-MM-DD'),
      genero: person.genero,
      status: person.status,
    })
    setIsModalOpen(true)
  }

  /**
   * Abrir modal de confirmação para deletar
   */
  const handleDelete = (person: ShelteredPerson) => {
    setSelectedSheltered(person)
    setIsDeleteModalOpen(true)
  }

  /**
   * Confirmar deleção do abrigado
   */
  const handleDeleteConfirm = async () => {
    if (!selectedSheltered) return

    try {
      setIsSaving(true)
      setError(null)
      await shelteredPeopleService.delete(selectedSheltered.id)
      handleSuccess(SUCCESS_MESSAGES.DELETED)
      await loadSheltered()
      setIsDeleteModalOpen(false)
      setSelectedSheltered(null)
    } catch (err) {
      console.error('Erro ao deletar abrigado:', err)
      const errorMsg = getErrorMessage(err)
      setError(errorMsg)
      handleError(err)
    } finally {
      setIsSaving(false)
    }
  }

  /**
   * Manipular mudanças nos inputs do formulário
   */
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  /**
   * Limpar todos os filtros
   */
  const clearFilters = () => {
    setFilterStatus('')
    setFilterGenero('')
    setFilterIdade('')
    setSearchValue('')
  }

  /**
   * Limpar filtros com reset de página
   */
  const handleClearFilters = () => {
    clearFilters()
    setCurrentPage(1)
  }

  /**
   * Fazer checkout de abrigados (marcar como inativos)
   */
  const handleCheckout = async (peopleIds: string[]) => {
    setIsCheckingOut(true)
    try {
      await shelteredPeopleService.checkout(peopleIds, shelterId)
      handleSuccess('Checkout realizado com sucesso!')

      // Recarregar lista
      await loadSheltered()
      setCheckoutModalOpen(false)
    } catch (err: any) {
      console.error('Error checking out sheltered people:', err)
      const errorMsg = getErrorMessage(err)
      setError(errorMsg)
      handleError(err)
    } finally {
      setIsCheckingOut(false)
    }
  }

  /**
   * Submeter formulário (criar ou atualizar)
   */
  const handleSubmit = async () => {
    try {
      setIsSaving(true)
      setError(null)

      if (isEditMode && selectedSheltered) {
        // Atualizar abrigado existente
        const updateData: UpdateShelteredPersonData = {
          ...formData,
        }
        await shelteredPeopleService.update(selectedSheltered.id, updateData)
        handleSuccess(SUCCESS_MESSAGES.UPDATED)
      } else {
        // Criar novo abrigado
        const createData: CreateShelteredPersonData = {
          ...formData,
          shelterId,
        }
        await shelteredPeopleService.create(createData)
        handleSuccess(SUCCESS_MESSAGES.CREATED)
      }

      await loadSheltered()
      setIsModalOpen(false)
      setFormData(INITIAL_FORM)
      setSelectedSheltered(null)
    } catch (err) {
      console.error('Erro ao salvar abrigado:', err)
      const errorMsg = getErrorMessage(err)
      setError(errorMsg)
      handleError(err)
    } finally {
      setIsSaving(false)
    }
  }

  return {
    // Dados
    sheltered: filteredSheltered,
    formData,
    selectedSheltered,

    // Permissões
    user,
    isAdmin,
    userCanWrite,

    // Disclaimer
    isDisclaimerOpen,
    disclaimerModule,
    openDisclaimer,
    closeDisclaimer,

    // Paginação
    currentPage,
    setCurrentPage,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(filteredSheltered.length / PAGE_SIZE),
    paginatedData: filteredSheltered.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
    ),

    // Estados de UI
    isModalOpen,
    isDeleteModalOpen,
    isEditMode,

    // Estados de carregamento
    isLoading,
    isSaving,
    error,

    // Estados de modal de checkout
    checkoutModalOpen,
    setCheckoutModalOpen,
    isCheckingOut,

    // Filtros
    filterStatus,
    filterGenero,
    filterIdade,
    searchValue,
    setFilterStatus,
    setFilterGenero,
    setFilterIdade,
    setSearchValue,

    // Constantes
    statusOptions: STATUS_OPTIONS,
    generoOptions: GENERO_OPTIONS,
    idadeOptions: IDADE_OPTIONS,

    // Funções de controle de modals
    setIsModalOpen,
    setIsDeleteModalOpen,

    // Funções de ação
    handleAdd,
    handleEdit,
    handleDelete,
    handleDeleteConfirm,
    handleInputChange,
    handleSubmit,
    loadSheltered,
    handleClearFilters,
    handleCheckout,
  }
}
