export interface VolunteerProps {
  id: string
  userId: string
  user: {
    id: string
    name: string
    email: string
  }
  phone: string
  skills: string[]
  status: string
  lastActivity: string | Date
  shelterId: string
  shelter?: {
    id: string
    name: string
  }
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface CreateVolunteerDto {
  userId: string
  phone: string
  skills?: string[]
  status?: string
  shelterId: string
}

export type UpdateVolunteerDto = Partial<CreateVolunteerDto>

