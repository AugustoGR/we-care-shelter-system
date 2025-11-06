import { VolunteerProps } from '@/@types/volunteerProps'
import { Column } from '@/components/ui/DataTable'

export type Volunteer = Omit<VolunteerProps, 'id' | 'shelterId'>

export const INITIAL_FORM = {
  userId: '',
  phone: '',
  skills: '',
  status: 'Ativo',
}

export const STATUS_OPTIONS = [
  { value: 'Ativo', label: 'Ativo' },
  { value: 'inativo', label: 'Inativo' },
  { value: 'Ausente', label: 'Ausente' },
]

export const COLUMNS: Column<Volunteer>[] = [
  {
    header: 'Nome',
    accessor: (row: Volunteer) => row.user.name,
    width: '200px',
  },
  {
    header: 'Contato',
    accessor: 'phone',
    width: '150px',
  },
  {
    header: 'Email',
    accessor: (row: Volunteer) => row.user.email,
    width: '220px',
  },
  {
    header: 'Habilidades',
    accessor: 'skills',
    width: '200px',
  },
  {
    header: 'Status',
    accessor: 'status',
    width: '120px',
  },
  {
    header: 'Última Atividade',
    accessor: 'lastActivity',
    width: '160px',
  },
]
