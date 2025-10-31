export interface Animal {
  id: string
  name: string
  species: string
  breed?: string | null
  age?: number | null
  sex: string
  health: string
  care?: string | null
  rabies: boolean
  cinomose: boolean
  parvo: boolean
  felina: boolean
  photo?: string | null
  status: string
  shelterId: string
  shelter?: {
    id: string
    name: string
    city?: string
    state?: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateAnimalData {
  name: string
  species: string
  breed?: string
  age?: number
  sex: string
  health: string
  care?: string
  rabies?: boolean
  cinomose?: boolean
  parvo?: boolean
  felina?: boolean
  photo?: string
  status?: string
  shelterId: string
}

export interface UpdateAnimalData {
  name?: string
  species?: string
  breed?: string
  age?: number
  sex?: string
  health?: string
  care?: string
  rabies?: boolean
  cinomose?: boolean
  parvo?: boolean
  felina?: boolean
  photo?: string
  status?: string
  shelterId?: string
}

export interface AnimalStats {
  total: number
  bySpecies: Array<{
    species: string
    _count: number
  }>
  byHealth: Array<{
    health: string
    _count: number
  }>
  byStatus: Array<{
    status: string
    _count: number
  }>
}
