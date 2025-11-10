import { useEffect, useState } from 'react'

import { Shelter } from '@/@types/shelterProps'
import { sheltersService } from '@/services'

export const useShelters = () => {
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadShelters()
  }, [])

  async function loadShelters() {
    try {
      setLoading(true)
      setError(null)
      const data = await sheltersService.findMyShelters()
      setShelters(data)
    } catch (err: any) {
      console.error('Erro ao carregar abrigos:', err)
      setError(err?.response?.data?.message || 'Erro ao carregar abrigos')
    } finally {
      setLoading(false)
    }
  }

  const filteredShelters = shelters.filter((shelter) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      shelter.name.toLowerCase().includes(searchLower) ||
      shelter.calamity.toLowerCase().includes(searchLower) ||
      shelter.city.toLowerCase().includes(searchLower)
    )
  })

  return {
    shelters,
    loading,
    searchTerm,
    setSearchTerm,
    error,
    filteredShelters,
    loadShelters,
  }
}
