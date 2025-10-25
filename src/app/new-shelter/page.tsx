'use client'
import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { CreateShelterData } from '@/@types/shelterProps'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { sheltersService } from '@/services'

import styles from '../(shelters)/Shelters.module.scss'

const calamities = [
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

const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

export default function NewShelter() {
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
        err?.response?.data?.message || 'Erro ao criar abrigo. Tente novamente.',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/')
  }

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Cadastro de Abrigo</h1>
        <h2 className={styles.formSubtitle}>
          Preencha os detalhes para registrar um novo abrigo emergencial.
        </h2>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Nome do Abrigo
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Ex: Abrigo Esperança"
              className={styles.input}
              value={formData.name}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description" className={styles.label}>
              Descrição do Abrigo
            </label>
            <textarea
              id="description"
              placeholder="Uma breve descrição sobre o abrigo e suas características."
              className={styles.textarea}
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="calamity" className={styles.label}>
              Tipo de Calamidade
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="calamity"
                className={styles.select}
                value={formData.calamity}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="">Selecione o tipo de calamidade</option>
                {calamities.map((c, i) => (
                  <option value={c} key={i}>
                    {c}
                  </option>
                ))}
              </select>
              <Image
                src="/img/chevron-down.svg"
                alt="Abrir"
                width={16}
                height={16}
                className={styles.selectIcon}
              />
            </div>
          </div>

          <div className={styles.inputGroupRow}>
            <div className={styles.inputGroupHalf}>
              <label htmlFor="address" className={styles.label}>
                Endereço
              </label>
              <Input
                id="address"
                type="text"
                placeholder="Endereço (Ex: Rua da Paz, 123)"
                className={styles.input}
                value={formData.address}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>

            <div className={styles.inputGroupHalf}>
              <label htmlFor="city" className={styles.label}>
                Cidade
              </label>
              <Input
                id="city"
                type="text"
                placeholder="Cidade"
                className={styles.input}
                value={formData.city}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>

            <div className={styles.inputGroupHalf}>
              <label htmlFor="state" className={styles.label}>
                Estado
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="state"
                  className={styles.select}
                  value={formData.state}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="">Selecione o estado</option>
                  {brazilianStates.map((state) => (
                    <option value={state.value} key={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                <Image
                  src="/img/chevron-down.svg"
                  alt="Abrir"
                  width={16}
                  height={16}
                  className={styles.selectIcon}
                />
              </div>
            </div>

            <div className={styles.inputGroupHalf}>
              <label htmlFor="cep" className={styles.label}>
                CEP
              </label>
              <Input
                id="cep"
                type="text"
                placeholder="CEP"
                className={styles.input}
                value={formData.cep}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.statusRow}>
            <span className={styles.statusLabel}>Abrigo Ativo</span>
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, active: checked }))
              }
              disabled={loading}
            />
          </div>

          <div className={styles.buttonRow}>
            <Button
              type="button"
              variant="ghost"
              className={styles.cancelButton}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className={styles.saveButton}
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar Abrigo'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
