import { Column } from '@/components/ui/DataTable'

export interface Volunteer {
  name: string
  phone: string
  email: string
  skills: string[]
  status: string
  lastActivity: string
}

export const VOLUNTEERS: Volunteer[] = [
  {
    name: 'Ana Silva',
    phone: '(11) 98765-4321',
    email: 'ana.silva@example.com',
    skills: ['Enfermagem', 'Organização'],
    status: 'Ativo',
    lastActivity: '2 horas atrás',
  },
  {
    name: 'Carlos Mendes',
    phone: '(21) 99876-1234',
    email: 'carlos.mendes@example.com',
    skills: ['Logística', 'Transporte'],
    status: 'Ativo',
    lastActivity: '4 horas atrás',
  },
  {
    name: 'Beatriz Costa',
    phone: '(31) 97654-9876',
    email: 'bia.costa@example.com',
    skills: ['Psicologia', 'Apoio emocional'],
    status: 'Inativo',
    lastActivity: '1 dia atrás',
  },
  {
    name: 'João Pereira',
    phone: '(41) 91234-5678',
    email: 'joao.pereira@example.com',
    skills: ['Culinária', 'Limpeza'],
    status: 'Ausente',
    lastActivity: '3 dias atrás',
  },
  {
    name: 'Sofia Oliveira',
    phone: '(51) 96789-0123',
    email: 'sofia.oliveira@example.com',
    skills: ['Veterinária', 'Cuidado animal'],
    status: 'Ativo',
    lastActivity: '8 horas atrás',
  },
  {
    name: 'Miguel Santos',
    phone: '(61) 95432-8765',
    email: 'miguel.santos@example.com',
    skills: ['Manutenção', 'Eletricista'],
    status: 'Ativo',
    lastActivity: '1 hora atrás',
  },
]

export const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
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
    accessor: 'name',
    width: '200px',
  },
  {
    header: 'Contato',
    accessor: 'phone',
    width: '150px',
  },
  {
    header: 'Email',
    accessor: 'email',
    width: '220px',
  },
  {
    header: 'Habilidades',
    accessor: 'skills',
    width: '250px',
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
