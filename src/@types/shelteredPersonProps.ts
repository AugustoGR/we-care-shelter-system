export interface ShelteredPerson {
  id: string
  nome: string
  cpf: string
  dataNascimento: string // ISO date string from API
  genero: string
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

export interface CreateShelteredPersonData {
  nome: string
  cpf: string
  dataNascimento: string // YYYY-MM-DD format
  genero: string
  status?: string
  shelterId: string
}

export interface UpdateShelteredPersonData {
  nome?: string
  cpf?: string
  dataNascimento?: string
  genero?: string
  status?: string
  shelterId?: string
}

export interface ShelteredPeopleStats {
  total: number
  byGenero: Array<{
    genero: string
    _count: number
  }>
  byStatus: Array<{
    status: string
    _count: number
  }>
  byAgeRange: Array<{
    range: string
    count: number
  }>
}
