import {
  Animal,
  CreateAnimalData,
  UpdateAnimalData,
  AnimalStats,
} from '@/@types/animalProps'

import { api } from '../api'

export const animalsService = {
  /**
   * Criar um novo animal
   */
  async create(data: CreateAnimalData): Promise<Animal> {
    const response = await api.post<Animal>('/animals', data)
    return response.data
  },

  /**
   * Listar todos os animais com filtro opcional por abrigo
   */
  async findAll(shelterId?: string): Promise<Animal[]> {
    const params = shelterId ? { shelterId } : {}
    const response = await api.get<Animal[]>('/animals', { params })
    return response.data
  },

  /**
   * Listar animais de um abrigo específico
   */
  async findByShelterId(shelterId: string): Promise<Animal[]> {
    const response = await api.get<Animal[]>(`/animals/shelter/${shelterId}`)
    return response.data
  },

  /**
   * Buscar um animal por ID
   */
  async findOne(id: string): Promise<Animal> {
    const response = await api.get<Animal>(`/animals/${id}`)
    return response.data
  },

  /**
   * Atualizar um animal
   */
  async update(id: string, data: UpdateAnimalData): Promise<Animal> {
    const response = await api.patch<Animal>(`/animals/${id}`, data)
    return response.data
  },

  /**
   * Deletar um animal
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/animals/${id}`)
  },

  /**
   * Obter estatísticas dos animais de um abrigo
   */
  async getStatsByShelterId(shelterId: string): Promise<AnimalStats> {
    const response = await api.get<AnimalStats>(
      `/animals/shelter/${shelterId}/stats`,
    )
    return response.data
  },
}
