export interface Shelter {
  id: string
  name: string
  description?: string
  calamity: string
  address: string
  city: string
  state: string
  cep: string
  active: boolean
  ownerId: string
  createdAt: string
  updatedAt: string
}

export interface CreateShelterData {
  name: string
  description?: string
  calamity: string
  address: string
  city: string
  state: string
  cep: string
  active?: boolean
}

export interface UpdateShelterData {
  name?: string
  description?: string
  calamity?: string
  address?: string
  city?: string
  state?: string
  cep?: string
  active?: boolean
  ownerId?: string
}

export interface ShelterFilters {
  active?: boolean
  calamity?: string
  city?: string
  state?: string
}
