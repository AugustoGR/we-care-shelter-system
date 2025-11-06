import type {
  ShelterModuleProps,
  UpdateShelterModuleDto,
} from '@/@types'

import { api } from '../api'

export const shelterModulesService = {
  async getAll(shelterId: string): Promise<ShelterModuleProps[]> {
    const response = await api.get(`/shelters/${shelterId}/modules`)
    return response.data
  },

  async getOne(shelterId: string, moduleId: string): Promise<ShelterModuleProps> {
    const response = await api.get(`/shelters/${shelterId}/modules/${moduleId}`)
    return response.data
  },

  async update(
    shelterId: string,
    moduleId: string,
    data: UpdateShelterModuleDto,
  ): Promise<ShelterModuleProps> {
    const response = await api.patch(`/shelters/${shelterId}/modules/${moduleId}`, data)
    return response.data
  },

  async toggleActive(
    shelterId: string,
    moduleId: string,
  ): Promise<ShelterModuleProps> {
    const response = await api.patch(`/shelters/${shelterId}/modules/${moduleId}/toggle`)
    return response.data
  },
}
