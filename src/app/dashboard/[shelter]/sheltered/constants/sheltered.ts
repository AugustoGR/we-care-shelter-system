import moment from 'moment'

import {
  ShelteredPerson,
  CreateShelteredPersonData,
} from '@/@types/shelteredPersonProps'
import { Column } from '@/components/ui/DataTable'

export type { ShelteredPerson, CreateShelteredPersonData }

export const INITIAL_FORM: Omit<
  CreateShelteredPersonData,
  'shelterId'
> = {
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

export const IDADE_OPTIONS = [
  { value: '0-18', label: '0-18 anos' },
  { value: '19-30', label: '19-30 anos' },
  { value: '31-50', label: '31-50 anos' },
  { value: '51+', label: '51+ anos' },
]

export const PAGE_SIZE = 10

export const COLUMNS: Column<ShelteredPerson>[] = [
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
    accessor: (row: ShelteredPerson) =>
      moment.utc(row.dataNascimento).format('DD/MM/YYYY'),
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
