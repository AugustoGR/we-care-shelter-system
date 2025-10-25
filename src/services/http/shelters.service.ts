import {
  Shelter,
  CreateShelterData,
  UpdateShelterData,
  ShelterFilters,
} from '@/@types/shelterProps'

import { api } from '../api'

export const sheltersService = {
  /**
   * Criar um novo abrigo
   */
  async create(data: CreateShelterData): Promise<Shelter> {
    const response = await api.post<Shelter>('/shelters', data)
    return response.data
  },

  /**
   * Listar todos os abrigos com filtros opcionais
   */
  async findAll(filters?: ShelterFilters): Promise<Shelter[]> {
    const params = new URLSearchParams()

    if (filters?.active !== undefined) {
      params.append('active', String(filters.active))
    }

    if (filters?.calamity) {
      params.append('calamity', filters.calamity)
    }

    if (filters?.city) {
      params.append('city', filters.city)
    }

    if (filters?.state) {
      params.append('state', filters.state)
    }

    const response = await api.get<Shelter[]>('/shelters', {
      params,
    })
    return response.data
  },

  /**
   * Listar meus abrigos (onde sou proprietário)
   */
  async findMyOwnedShelters(): Promise<Shelter[]> {
    const response = await api.get<Shelter[]>('/shelters/my-shelters')
    return response.data
  },

  /**
   * Buscar um abrigo por ID
   */
  async findOne(id: string): Promise<Shelter> {
    const response = await api.get<Shelter>(`/shelters/${id}`)
    return response.data
  },

  /**
   * Atualizar um abrigo
   */
  async update(id: string, data: UpdateShelterData): Promise<Shelter> {
    const response = await api.patch<Shelter>(`/shelters/${id}`, data)
    return response.data
  },

  /**
   * Deletar um abrigo
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/shelters/${id}`)
  },
}
