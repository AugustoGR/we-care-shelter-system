import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react'

import { useParams, useRouter } from 'next/navigation'

import type { UpdateShelterData } from '@/@types/shelterProps'
import { useErrorHandler } from '@/hooks'
import { useShelterPermissions } from '@/hooks/useShelterPermissions'
import { sheltersService } from '@/services/http/shelters.service'
import { SUCCESS_MESSAGES } from '@/utils/errorMessages'

export const CALAMITIES = [
  'Inundação',
  'Deslizamento de Terra',
  'Incêndio Florestal',
  'Vendaval',
  'Terremoto',
  'Tempestade Tropical',
  'Gelo e Neve',
  'Seca Severa',
  'Ciclone',
]

export const useShelterSettings = () => {
  const params = useParams()
  const router = useRouter()
  const shelterId = params.shelter as string
  const { handleError, handleSuccess } = useErrorHandler()

  const { isAdmin, isLoading: permissionsLoading } =
    useShelterPermissions(shelterId)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [formData, setFormData] = useState<UpdateShelterData>({
    name: '',
    description: '',
    calamity: '',
    address: '',
    city: '',
    state: '',
    cep: '',
    active: true,
  })

  // Carrega os dados do abrigo
  const fetchShelter = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await sheltersService.findOne(shelterId)
      setFormData({
        name: data.name,
        description: data.description || '',
        calamity: data.calamity,
        address: data.address,
        city: data.city,
        state: data.state,
        cep: data.cep,
        active: data.active,
      })
    } catch (err) {
      const errorMsg = 'Erro ao carregar dados do abrigo'
      setError(errorMsg)
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }, [shelterId, handleError])

  useEffect(() => {
    if (shelterId) {
      fetchShelter()
    }
  }, [shelterId, fetchShelter])

  // Redireciona se não for admin
  useEffect(() => {
    if (!permissionsLoading && !isAdmin) {
      router.push(`/dashboard/${shelterId}`)
    }
  }, [isAdmin, permissionsLoading, router, shelterId])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
    setError(null)
    setSuccessMessage(null)
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      active: checked,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    // Validações
    if (!formData.name?.trim()) {
      setError('Nome do abrigo é obrigatório')
      return
    }

    if (!formData.calamity?.trim()) {
      setError('Tipo de calamidade é obrigatório')
      return
    }

    if (!formData.address?.trim()) {
      setError('Endereço é obrigatório')
      return
    }

    if (!formData.city?.trim()) {
      setError('Cidade é obrigatória')
      return
    }

    if (!formData.state?.trim()) {
      setError('Estado é obrigatório')
      return
    }

    if (!formData.cep?.trim()) {
      setError('CEP é obrigatório')
      return
    }

    try {
      setIsSaving(true)
      await sheltersService.update(shelterId, formData)
      setSuccessMessage('Abrigo atualizado com sucesso!')
      handleSuccess(SUCCESS_MESSAGES.UPDATED)
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Erro ao atualizar abrigo'
      setError(errorMsg)
      handleError(err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return {
    // Permissões
    isAdmin,
    permissionsLoading,

    // Estados de carregamento
    isLoading,
    isSaving,

    // Estados de mensagem
    error,
    successMessage,

    // Dados do formulário
    formData,

    // Constantes
    calamities: CALAMITIES,

    // Funções
    handleInputChange,
    handleSwitchChange,
    handleSubmit,
    handleCancel,
  }
}
