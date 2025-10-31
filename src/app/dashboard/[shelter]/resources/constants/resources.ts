import { ResourceProps } from '@/@types'
import { Column } from '@/components/ui/DataTable'

export const CATEGORIAS = ['Alimentos', 'Medicamentos', 'Higiene', 'Água']

export const UNIDADES = [
  'pacotes',
  'cartelas',
  'unidades',
  'garrafões',
  'rolos',
  'latas',
]

export const STATUS_OPTIONS = [
  { value: 'Em Estoque', label: 'Em Estoque' },
  { value: 'Estoque Baixo', label: 'Estoque Baixo' },
  { value: 'Vencido', label: 'Vencido' },
]

export const INITIAL_FORM = {
  nome: '',
  categoria: '',
  quantidade: '',
  unidade: '',
  validade: '',
  status: 'Em Estoque',
}

export const COLUMNS: Column<ResourceProps>[] = [
  {
    header: 'Nome',
    accessor: 'nome',
    width: '200px',
  },
  {
    header: 'Categoria',
    accessor: 'categoria',
    width: '140px',
  },
  {
    header: 'Quantidade',
    accessor: 'quantidade',
    width: '120px',
  },
  {
    header: 'Unidade',
    accessor: 'unidade',
    width: '120px',
  },
  {
    header: 'Validade',
    accessor: (row) => {
      if (!row.validade) return 'Sem validade'
      const date = new Date(row.validade)
      return date.toLocaleDateString('pt-BR')
    },
    width: '140px',
  },
  {
    header: 'Status',
    accessor: 'status',
    width: '150px',
  },
]
