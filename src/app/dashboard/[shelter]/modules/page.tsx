'use client'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

import styles from './Modules.module.scss'

const modules = [
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

export default function ModulesPage() {
  const [moduleStates, setModuleStates] = useState(
    modules.reduce(
      (acc, mod) => ({ ...acc, [mod.key]: mod.active }),
      {} as Record<string, boolean>,
    ),
  )

  const handleToggle = (key: string) => {
    setModuleStates((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      <h1 className={styles.title}>Ativação de Módulos</h1>
      <p className={styles.subtitle}>
        Gerencie a ativação e desativação dos módulos funcionais do sistema
        Abrigo Emergencial. Cada módulo pode ser ligado ou desligado para
        adaptar as funcionalidades do abrigo conforme necessário.
      </p>
      <div className={styles.grid}>
        {modules.map((mod) => (
          <div key={mod.key} className={styles.card}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>{mod.icon}</span>
            </div>
            <h2 className={styles.cardTitle}>{mod.title}</h2>
            <div className={styles.cardDesc}>
              <p>{mod.desc}</p>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.statusWrapper}>
                <Switch
                  checked={moduleStates[mod.key]}
                  onCheckedChange={() => handleToggle(mod.key)}
                />
                <span
                  className={
                    moduleStates[mod.key]
                      ? styles.statusTextActive
                      : styles.statusTextInactive
                  }
                >
                  {moduleStates[mod.key] ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <Button className={styles.manageBtn}>Gerenciar</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
