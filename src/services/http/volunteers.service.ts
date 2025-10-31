import {
  VolunteerProps,
  CreateVolunteerDto,
  UpdateVolunteerDto,
} from '@/@types/volunteerProps'

import { api } from '../api'

export const volunteersService = {
  /**
   * Criar um novo voluntário
   */
  async create(data: CreateVolunteerDto): Promise<VolunteerProps> {
    const response = await api.post<VolunteerProps>('/volunteers', data)
    return response.data
  },

  /**
   * Listar todos os voluntários
   */
  async findAll(shelterId?: string): Promise<VolunteerProps[]> {
    const params = shelterId ? { shelterId } : {}
    const response = await api.get<VolunteerProps[]>('/volunteers', {
      params,
    })
    return response.data
  },

  /**
   * Buscar um voluntário por ID
   */
  async findOne(id: string): Promise<VolunteerProps> {
    const response = await api.get<VolunteerProps>(`/volunteers/${id}`)
    return response.data
  },

  /**
   * Atualizar um voluntário
   */
  async update(
    id: string,
    data: UpdateVolunteerDto
  ): Promise<VolunteerProps> {
    const response = await api.patch<VolunteerProps>(`/volunteers/${id}`, data)
    return response.data
  },

  /**
   * Deletar um voluntário
   */
  async remove(id: string): Promise<void> {
    await api.delete(`/volunteers/${id}`)
  },

  /**
   * Atualizar última atividade do voluntário
   */
  async updateActivity(id: string): Promise<VolunteerProps> {
    const response = await api.patch<VolunteerProps>(
      `/volunteers/${id}/activity`
    )
    return response.data
  },
}
