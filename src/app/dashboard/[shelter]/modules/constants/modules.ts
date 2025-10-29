export interface Module {
  key: string
  title: string
  desc: string
  icon: string
  active: boolean
}

export const MODULES: Module[] = [
  {
    key: 'shelters',
    title: 'Cadastro de Abrigos',
    desc: 'Gerencia o registro e os detalhes de todos os abrigos emergenciais, incluindo localização, capacidade e status de ativação.',
    icon: '🏢',
    active: true,
  },
  {
    key: 'people',
    title: 'Gestão de Abrigaos',
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
    key: 'notifications',
    title: 'Sistema de Notificações',
    desc: 'Envia alertas importantes sobre escassez de recursos, status de abrigos e atualizações críticas para a equipe.',
    icon: '🔔',
    active: true,
  },
  {
    key: 'reports',
    title: 'Geração de Relatórios',
    desc: 'Compila e apresenta dados sobre abrigados, voluntários e recursos em relatórios visuais e tabelas para análise.',
    icon: '📄',
    active: false,
  },
  {
    key: 'management',
    title: 'Gestão Interna',
    desc: 'Administra permissões de usuários, atribuição de gestores de módulos e configurações gerais do sistema.',
    icon: '⚙️',
    active: true,
  },
]
