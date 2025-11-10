import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react'

import { useParams } from 'next/navigation'

import { Animal } from '@/@types/animalProps'
import { useAuth } from '@/contexts/AuthContext'
import {
  useErrorHandler,
  useModuleDisclaimer,
  usePermissions,
  useShelterPermissions,
} from '@/hooks'
import { animalsService } from '@/services'
import { getErrorMessage, SUCCESS_MESSAGES } from '@/utils/errorMessages'

import { useModules } from '../../modules/hooks/useModules'
import { INITIAL_FORM } from '../constants/animals'

export const useShelteredAnimals = () => {
  const params = useParams()
  const shelterId = params.shelter as string
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
  const { getModuleData } = useModules()

  // Verificar permissões
  const userCanWrite = isAdmin || canWriteInModule('animals', permissionModules)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null)
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

  // Estados para modal de foto
  const [photoModalOpen, setPhotoModalOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string
    name: string
  } | null>(null)

  // Estados para modal de checkout
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

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
      const errorMsg = getErrorMessage(err)
      setError(errorMsg)
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }, [shelterId, handleError])

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
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleEdit = (animal: Animal) => {
    setAnimalToEdit(animal)
    setIsEditMode(true)
    setForm({
      name: animal.name,
      species: animal.species,
      breed: animal.breed || '',
      age: animal.age?.toString() || '',
      sex: animal.sex,
      health: animal.health,
      care: animal.care || '',
      rabies: animal.rabies,
      cinomose: animal.cinomose,
      parvo: animal.parvo,
      felina: animal.felina,
      photo: null,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      setIsSaving(true)
      setError(null)

      // Converter age para number se preenchido
      const age = form.age ? parseInt(form.age) : undefined

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
        status: form.health,
        shelterId,
      }

      if (isEditMode && animalToEdit) {
        await animalsService.update(animalToEdit.id, animalData, form.photo || undefined)
        handleSuccess(SUCCESS_MESSAGES.UPDATED)
      } else {
        await animalsService.create(animalData, form.photo || undefined)
        handleSuccess(SUCCESS_MESSAGES.CREATED)
      }

      // Recarregar lista
      await loadAnimals()

      // Fechar modal e resetar form
      setIsModalOpen(false)
      setIsEditMode(false)
      setAnimalToEdit(null)
      setForm(INITIAL_FORM)
    } catch (err: any) {
      console.error('Error saving animal:', err)
      const errorMsg = getErrorMessage(err)
      setError(errorMsg)
      handleError(err)
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
      handleSuccess(SUCCESS_MESSAGES.DELETED)

      // Recarregar lista
      await loadAnimals()
    } catch (err: any) {
      console.error('Error deleting animal:', err)
      const errorMsg = getErrorMessage(err)
      setError(errorMsg)
      handleError(err)
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

  const handlePhotoClick = (photoUrl: string, animalName: string) => {
    setSelectedPhoto({ url: photoUrl, name: animalName })
    setPhotoModalOpen(true)
  }

  const closePhotoModal = () => {
    setPhotoModalOpen(false)
    setSelectedPhoto(null)
  }

  const clearFilters = () => {
    setSearch('')
    setSpeciesFilter('')
  }

  const handleCheckout = async (animalIds: string[]) => {
    setIsCheckingOut(true)
    try {
      await animalsService.checkout(animalIds, shelterId)
      handleSuccess('Checkout realizado com sucesso!')

      // Recarregar lista
      await loadAnimals()
      setCheckoutModalOpen(false)
    } catch (err: any) {
      console.error('Error checking out animals:', err)
      const errorMsg = getErrorMessage(err)
      setError(errorMsg)
      handleError(err)
    } finally {
      setIsCheckingOut(false)
    }
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

    // Module data
    getModuleData,

    // Estados de UI
    isModalOpen,
    setIsModalOpen,
    isEditMode,
    animalToEdit,
    deleteModalOpen,
    setDeleteModalOpen,
    animalToDelete,
    setAnimalToDelete,

    // Estados de modal de foto
    photoModalOpen,
    selectedPhoto,

    // Estados de modal de checkout
    checkoutModalOpen,
    setCheckoutModalOpen,
    isCheckingOut,

    // Estados de carregamento
    isDeleting,
    isLoading,
    isSaving,
    error,

    // Dados
    form,
    setForm,
    search,
    setSearch,
    speciesFilter,
    setSpeciesFilter,
    filtered,
    animals,

    // Funções
    handleInputChange,
    handleEdit,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCheckboxChange,
    handleFileChange,
    handlePhotoClick,
    closePhotoModal,
    clearFilters,
    loadAnimals,
    handleCheckout,
  }
}
