export interface ShelterModuleProps {
  id: string
  shelterId: string
  moduleKey: string
  active: boolean
  responsibleVolunteerId?: string | null
  responsibleVolunteer?: {
    id: string
    phone: string
    user: {
      id: string
      name: string
      email: string
    }
  } | null
  associatedVolunteers?: Array<{
    id: string
    volunteer: {
      id: string
      phone: string
      user: {
        id: string
        name: string
        email: string
      }
    }
  }>
  createdAt: string
  updatedAt: string
}

export interface CreateShelterModuleDto {
  moduleKey: string
  active?: boolean
  responsibleVolunteerId?: string
  associatedVolunteerIds?: string[]
}

export interface UpdateShelterModuleDto {
  active?: boolean
  responsibleVolunteerId?: string
  associatedVolunteerIds?: string[]
}
