import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import { CreateShelterData } from '@/@types/shelterProps'
import { sheltersService } from '@/services'

export const useNewShelter = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<CreateShelterData>({
    name: '',
    description: '',
    calamity: '',
    address: '',
    city: '',
    state: '',
    cep: '',
    active: true,
  })

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target

    // Formata o CEP automaticamente
    if (id === 'cep') {
      const formatted = value
        .replace(/\D/g, '') // Remove tudo que não é número
        .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona o hífen
        .slice(0, 9) // Limita a 9 caracteres (00000-000)

      setFormData((prev) => ({ ...prev, [id]: formatted }))
      return
    }

    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validações básicas
    if (!formData.name.trim()) {
      setError('Nome do abrigo é obrigatório')
      return
    }

    if (!formData.calamity) {
      setError('Selecione o tipo de calamidade')
      return
    }

    if (!formData.address.trim()) {
      setError('Endereço é obrigatório')
      return
    }

    if (!formData.city.trim()) {
      setError('Cidade é obrigatória')
      return
    }

    if (!formData.state) {
      setError('Selecione o estado')
      return
    }

    if (!formData.cep.trim()) {
      setError('CEP é obrigatório')
      return
    }

    // Valida formato do CEP
    const cepNumbers = formData.cep.replace(/\D/g, '')
    if (cepNumbers.length !== 8) {
      setError('CEP deve ter 8 dígitos')
      return
    }

    try {
      setLoading(true)
      await sheltersService.create(formData)

      // Redireciona para a listagem de abrigos após sucesso
      router.push('/')
    } catch (err: any) {
      console.error('Erro ao criar abrigo:', err)
      setError(
        err?.response?.data?.message ||
          'Erro ao criar abrigo. Tente novamente.',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/')
  }

  const handleActiveChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, active: checked }))
  }

  return {
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
    handleCancel,
    handleActiveChange,
  }
}
