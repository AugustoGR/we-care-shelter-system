import {
  VolunteerInvitationProps,
  CreateVolunteerInvitationDto,
  RespondInvitationDto,
} from '@/@types/volunteerInvitationProps'

import { api } from '../api'

export const volunteerInvitationsService = {
  /**
   * Criar um novo convite de voluntário
   */
  async create(
    data: CreateVolunteerInvitationDto
  ): Promise<VolunteerInvitationProps> {
    const response = await api.post<VolunteerInvitationProps>(
      '/volunteer-invitations',
      data
    )
    return response.data
  },

  /**
   * Listar convites pendentes do usuário logado
   */
  async getMyInvitations(): Promise<VolunteerInvitationProps[]> {
    const response = await api.get<VolunteerInvitationProps[]>(
      '/volunteer-invitations/my-invitations'
    )
    return response.data
  },

  /**
   * Responder a um convite (aceitar ou recusar)
   */
  async respond(invitationId: string, data: RespondInvitationDto): Promise<any> {
    const response = await api.patch(
      `/volunteer-invitations/${invitationId}/respond`,
      data
    )
    return response.data
  },

  /**
   * Deletar um convite
   */
  async remove(invitationId: string): Promise<void> {
    await api.delete(`/volunteer-invitations/${invitationId}`)
  },
}
