import {
  ShelteredPerson,
  CreateShelteredPersonData,
  UpdateShelteredPersonData,
  ShelteredPeopleStats,
} from '@/@types/shelteredPersonProps'

import { api } from '../api'

export const shelteredPeopleService = {
  /**
   * Cadastrar um novo abrigado
   */
  async create(data: CreateShelteredPersonData): Promise<ShelteredPerson> {
    const response = await api.post<ShelteredPerson>('/sheltered-people', data)
    return response.data
  },

  /**
   * Listar todos os abrigados com filtro opcional por abrigo
   */
  async findAll(shelterId?: string): Promise<ShelteredPerson[]> {
    const params = shelterId ? { shelterId } : {}
    const response = await api.get<ShelteredPerson[]>('/sheltered-people', {
      params,
    })
    return response.data
  },

  /**
   * Listar abrigados de um abrigo específico
   */
  async findByShelterId(shelterId: string): Promise<ShelteredPerson[]> {
    const response = await api.get<ShelteredPerson[]>(
      `/sheltered-people/shelter/${shelterId}`,
    )
    return response.data
  },

  /**
   * Buscar um abrigado por ID
   */
  async findOne(id: string): Promise<ShelteredPerson> {
    const response = await api.get<ShelteredPerson>(`/sheltered-people/${id}`)
    return response.data
  },

  /**
   * Buscar um abrigado por CPF
   */
  async findByCpf(cpf: string): Promise<ShelteredPerson> {
    const response = await api.get<ShelteredPerson>(
      `/sheltered-people/cpf/${cpf}`,
    )
    return response.data
  },

  /**
   * Atualizar um abrigado
   */
  async update(
    id: string,
    data: UpdateShelteredPersonData,
  ): Promise<ShelteredPerson> {
    const response = await api.patch<ShelteredPerson>(
      `/sheltered-people/${id}`,
      data,
    )
    return response.data
  },

  /**
   * Deletar um abrigado
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/sheltered-people/${id}`)
  },

  /**
   * Obter estatísticas dos abrigados de um abrigo
   */
  async getStatsByShelterId(
    shelterId: string,
  ): Promise<ShelteredPeopleStats> {
    const response = await api.get<ShelteredPeopleStats>(
      `/sheltered-people/shelter/${shelterId}/stats`,
    )
    return response.data
  },
}
