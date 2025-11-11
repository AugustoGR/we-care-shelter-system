export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum InvitationResponse {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface VolunteerInvitationProps {
  id: string
  userId: string
  shelterId: string
  phone: string
  skills: string[]
  status: InvitationStatus
  createdAt: string | Date
  updatedAt: string | Date
  shelter: {
    id: string
    name: string
    description?: string
    city: string
    state: string
  }
}

export interface CreateVolunteerInvitationDto {
  userId: string
  shelterId: string
  phone: string
  skills?: string[]
}

export interface RespondInvitationDto {
  response: InvitationResponse
}
