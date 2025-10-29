import { Column } from '@/components/ui/DataTable'

export interface Animal {
  name: string
  species: string
  breed: string
  age: number
  sex: string
  health: string
  status: string
  photo: string
}

export const ANIMALS: Animal[] = [
  {
    name: 'Tobby',
    species: 'Cachorro',
    breed: 'Labrador',
    age: 3,
    sex: 'Macho',
    health: 'Em Cuidado',
    status: 'Em Cuidado',
    photo: '',
  },
  {
    name: 'Mia',
    species: 'Gato',
    breed: 'Siamês',
    age: 1,
    sex: 'Fêmea',
    health: 'Aguardando Adoção',
    status: 'Aguardando Adoção',
    photo: '',
  },
  {
    name: 'Rex',
    species: 'Cachorro',
    breed: 'Pastor Alemão',
    age: 5,
    sex: 'Macho',
    health: 'Em Cuidado',
    status: 'Em Cuidado',
    photo: '',
  },
  {
    name: 'Luna',
    species: 'Gato',
    breed: 'Persa',
    age: 2,
    sex: 'Fêmea',
    health: 'Saudável',
    status: 'Aguardando Adoção',
    photo: '',
  },
]

export const INITIAL_FORM = {
  name: '',
  species: '',
  breed: '',
  age: '',
  sex: '',
  health: '',
  care: '',
  rabies: false,
  cinomose: false,
  parvo: false,
  felina: false,
  photo: null as File | null,
}

export const SEX_OPTIONS = [
  { value: 'Macho', label: 'Macho' },
  { value: 'Fêmea', label: 'Fêmea' },
]

export const HEALTH_OPTIONS = [
  { value: 'Saudável', label: 'Saudável' },
  { value: 'Em Cuidado', label: 'Em Cuidado' },
  { value: 'Aguardando Adoção', label: 'Aguardando Adoção' },
  { value: 'Adotado', label: 'Adotado' },
  { value: 'Reunido', label: 'Reunido' },
]

export const SPECIES_OPTIONS = [
  { value: 'Cachorro', label: 'Cachorro' },
  { value: 'Gato', label: 'Gato' },
]

export const COLUMNS: Column<Animal>[] = [
  {
    header: 'Foto',
    accessor: 'photo',
    width: '80px',
  },
  {
    header: 'Nome',
    accessor: 'name',
    width: '150px',
  },
  {
    header: 'Espécie',
    accessor: 'species',
    width: '120px',
  },
  {
    header: 'Raça',
    accessor: 'breed',
    width: '150px',
  },
  {
    header: 'Idade',
    accessor: 'age',
    width: '100px',
  },
  {
    header: 'Sexo',
    accessor: 'sex',
    width: '100px',
  },
  {
    header: 'Status',
    accessor: 'status',
    width: '150px',
  },
]
