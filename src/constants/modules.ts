/**
 * Informações dos módulos do sistema
 * Contém título, ícone, descrição e chave de cada módulo
 */
export const MODULE_INFO = {
  people: {
    key: 'people',
    title: 'Gestão de Abrigados',
    icon: '👥',
    desc: 'Gerencie todos os indivíduos abrigados cadastrados no sistema.',
  },
  resources: {
    key: 'resources',
    title: 'Gestão de Recursos',
    icon: '📦',
    desc: 'Controle e monitore todos os recursos disponíveis no abrigo.',
  },
  volunteers: {
    key: 'volunteers',
    title: 'Gestão de Voluntários',
    icon: '🤝',
    desc: 'Cadastre e organize os voluntários que auxiliam o abrigo.',
  },
  animals: {
    key: 'animals',
    title: 'Gestão de Animais',
    icon: '🐕',
    desc: 'Registre e acompanhe os animais abrigados.',
  },
  reports: {
    key: 'reports',
    title: 'Relatórios',
    icon: '📊',
    desc: 'Visualize relatórios e estatísticas do abrigo.',
  },
} as const

export type ModuleKey = keyof typeof MODULE_INFO
