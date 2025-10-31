export interface ResourceProps {
  id: string
  nome: string
  categoria: string
  quantidade: number
  unidade: string
  validade: string | null
  status: string
  shelterId: string
  createdAt: string
  updatedAt: string
}

export interface CreateResourceDto {
  nome: string
  categoria: string
  quantidade: number
  unidade: string
  validade?: string
  status: string
  shelterId: string
}

export interface UpdateResourceDto {
  nome?: string
  categoria?: string
  quantidade?: number
  unidade?: string
  validade?: string
  status?: string
}
