import { Column } from '@/components/ui/DataTable'

export interface Sheltered {
  nome: string
  cpf: string
  dataNascimento: string
  genero: string
  status: string
}

export const INITIAL_FORM: Sheltered = {
  nome: '',
  cpf: '',
  dataNascimento: '',
  genero: '',
  status: 'Ativo',
}

export const STATUS_OPTIONS = [
  { value: 'Ativo', label: 'Ativo' },
  { value: 'Inativo', label: 'Inativo' },
  { value: 'Transferido', label: 'Transferido' },
]

export const GENERO_OPTIONS = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Feminino', label: 'Feminino' },
  { value: 'Outro', label: 'Outro' },
]

export const MOCK_SHELTERED: Sheltered[] = [
  {
    nome: 'João Silva',
    cpf: '123.456.789-00',
    dataNascimento: '1985-03-15',
    genero: 'Masculino',
    status: 'Ativo',
  },
  {
    nome: 'Maria Santos',
    cpf: '987.654.321-00',
    dataNascimento: '1990-07-22',
    genero: 'Feminino',
    status: 'Ativo',
  },
  {
    nome: 'Pedro Costa',
    cpf: '456.789.123-00',
    dataNascimento: '1978-11-30',
    genero: 'Masculino',
    status: 'Transferido',
  },
  {
    nome: 'Ana Oliveira',
    cpf: '321.654.987-00',
    dataNascimento: '2000-05-10',
    genero: 'Feminino',
    status: 'Ativo',
  },
  {
    nome: 'Carlos Mendes',
    cpf: '789.123.456-00',
    dataNascimento: '1995-09-18',
    genero: 'Masculino',
    status: 'Inativo',
  },
]

export const IDADE_OPTIONS = [
  { value: '0-18', label: '0-18 anos' },
  { value: '19-30', label: '19-30 anos' },
  { value: '31-50', label: '31-50 anos' },
  { value: '51+', label: '51+ anos' },
]

export const PAGE_SIZE = 10

export const COLUMNS: Column<Sheltered>[] = [
  {
    header: 'Nome',
    accessor: 'nome',
    width: '200px',
  },
  {
    header: 'CPF',
    accessor: 'cpf',
    width: '150px',
  },
  {
    header: 'Data de Nascimento',
    accessor: 'dataNascimento',
    width: '180px',
  },
  {
    header: 'Gênero',
    accessor: 'genero',
    width: '120px',
  },
  {
    header: 'Status',
    accessor: 'status',
    width: '120px',
  },
]
