import { ResourceProps, CreateResourceDto, UpdateResourceDto } from '@/@types'

import { api } from '../api'

export const resourcesService = {
  /**
   * Criar um novo recurso
   */
  async create(data: CreateResourceDto): Promise<ResourceProps> {
    const response = await api.post<ResourceProps>('/resources', data)
    return response.data
  },

  /**
   * Listar todos os recursos com filtros opcionais
   */
  async findAll(shelterId?: string, categoria?: string): Promise<ResourceProps[]> {
    const params: any = {}
    if (shelterId) params.shelterId = shelterId
    if (categoria) params.categoria = categoria

    const response = await api.get<ResourceProps[]>('/resources', { params })
    return response.data
  },

  /**
   * Listar recursos de um abrigo específico
   */
  async findByShelterId(shelterId: string): Promise<ResourceProps[]> {
    const response = await api.get<ResourceProps[]>(`/resources/shelter/${shelterId}`)
    return response.data
  },

  /**
   * Buscar um recurso por ID
   */
  async findOne(id: string): Promise<ResourceProps> {
    const response = await api.get<ResourceProps>(`/resources/${id}`)
    return response.data
  },

  /**
   * Atualizar um recurso
   */
  async update(id: string, data: UpdateResourceDto): Promise<ResourceProps> {
    const response = await api.patch<ResourceProps>(`/resources/${id}`, data)
    return response.data
  },

  /**
   * Remover um recurso
   */
  async remove(id: string): Promise<void> {
    await api.delete(`/resources/${id}`)
  },
}
