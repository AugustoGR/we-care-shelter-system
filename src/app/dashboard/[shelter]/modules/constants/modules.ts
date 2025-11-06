export interface Module {
  key: string
  title: string
  desc: string
  icon: string
  active: boolean
}

export const MODULES: Module[] = [
  {
    key: 'people',
    title: 'Gestão de Abrigados',
    desc: 'Permite adicionar, editar e remover informações de pessoas abrigadas, acompanhando seu status e necessidades específicas.',
    icon: '👥',
    active: true,
  },
  {
    key: 'resources',
    title: 'Rastreamento de Recursos',
    desc: 'Controla o inventário de alimentos, medicamentos e suprimentos, alertando sobre baixos estoques e necessidades urgentes.',
    icon: '📦',
    active: true,
  },
  {
    key: 'volunteers',
    title: 'Coordenação de Voluntários',
    desc: 'Gerencia a equipe de voluntários, suas tarefas, horários e informações de contato, otimizando a distribuição de trabalho.',
    icon: '🤝',
    active: true,
  },
  {
    key: 'animals',
    title: 'Cuidado Animal',
    desc: 'Módulo dedicado ao registro e cuidado de animais abrigados, incluindo espécie, saúde e requisitos dietéticos.',
    icon: '🐾',
    active: false,
  },
  {
    key: 'reports',
    title: 'Geração de Relatórios',
    desc: 'Compila e apresenta dados sobre abrigados, voluntários e recursos em relatórios visuais e tabelas para análise.',
    icon: '📄',
    active: false,
  },
]
