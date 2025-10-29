import { Column } from '@/components/ui/DataTable'

export interface Resource {
  nome: string
  categoria: string
  quantidade: number
  unidade: string
  validade: string
  status: string
}

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

export const MOCK_RESOURCES: Resource[] = [
  {
    nome: 'Arroz 5kg',
    categoria: 'Alimentos',
    quantidade: 50,
    unidade: 'pacotes',
    validade: '2025-12-31',
    status: 'Em Estoque',
  },
  {
    nome: 'Paracetamol 500mg',
    categoria: 'Medicamentos',
    quantidade: 12,
    unidade: 'cartelas',
    validade: '2024-07-20',
    status: 'Estoque Baixo',
  },
  {
    nome: 'Sabonete Líquido',
    categoria: 'Higiene',
    quantidade: 30,
    unidade: 'unidades',
    validade: '2026-01-15',
    status: 'Em Estoque',
  },
  {
    nome: 'Água Mineral 20L',
    categoria: 'Água',
    quantidade: 8,
    unidade: 'garrafões',
    validade: '2025-03-10',
    status: 'Estoque Baixo',
  },
  {
    nome: 'Papel Higiênico',
    categoria: 'Higiene',
    quantidade: 100,
    unidade: 'rolos',
    validade: '2027-08-30',
    status: 'Em Estoque',
  },
  {
    nome: 'Feijão Preto 1kg',
    categoria: 'Alimentos',
    quantidade: 45,
    unidade: 'pacotes',
    validade: '2025-11-20',
    status: 'Em Estoque',
  },
  {
    nome: 'Dipirona 500mg',
    categoria: 'Medicamentos',
    quantidade: 5,
    unidade: 'cartelas',
    validade: '2023-10-15',
    status: 'Vencido',
  },
  {
    nome: 'Leite em Pó',
    categoria: 'Alimentos',
    quantidade: 20,
    unidade: 'latas',
    validade: '2024-12-05',
    status: 'Em Estoque',
  },
]

export const INITIAL_FORM: Omit<Resource, 'quantidade'> & { quantidade: string } = {
  nome: '',
  categoria: '',
  quantidade: '',
  unidade: '',
  validade: '',
  status: 'Em Estoque',
}

export const COLUMNS: Column<Resource>[] = [
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
