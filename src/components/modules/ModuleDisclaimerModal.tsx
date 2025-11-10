'use client'

import React from 'react'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/ui/button'

import styles from './ModuleDisclaimerModal.module.scss'

interface ModuleDisclaimerModalProps {
  isOpen: boolean
  onClose: () => void
  module: {
    key: string
    title: string
    icon: string
    desc: string
  }
  responsibleName?: string
  adminName?: string
  isUserAdmin: boolean
  isUserResponsible: boolean
  isUserAssociated: boolean
}

const MODULE_DETAILS: Record<
  string,
  {
    purpose: string
    permissions: {
      admin: string[]
      responsible: string[]
      associated: string[]
      viewer: string[]
    }
  }
> = {
  people: {
    purpose:
      'Gerenciar o cadastro e acompanhamento de pessoas abrigadas, incluindo informações pessoais, status de saúde e necessidades especiais.',
    permissions: {
      admin: [
        'Cadastrar novos abrigados',
        'Editar informações de abrigados',
        'Excluir registros',
        'Ativar/Desativar módulo',
        'Atribuir responsável',
        'Adicionar voluntários',
        'Visualizar todos os dados',
      ],
      responsible: [
        'Cadastrar novos abrigados',
        'Editar informações de abrigados',
        'Adicionar voluntários ao módulo',
        'Visualizar todos os dados',
      ],
      associated: [
        'Cadastrar novos abrigados',
        'Editar informações de abrigados',
        'Visualizar dados',
      ],
      viewer: ['Visualizar dados (somente leitura)'],
    },
  },
  resources: {
    purpose:
      'Controlar o estoque de recursos do abrigo, como alimentos, água, medicamentos, roupas e outros itens essenciais.',
    permissions: {
      admin: [
        'Cadastrar novos recursos',
        'Editar quantidade e informações',
        'Excluir recursos',
        'Ativar/Desativar módulo',
        'Atribuir responsável',
        'Adicionar voluntários',
        'Visualizar relatórios',
      ],
      responsible: [
        'Cadastrar novos recursos',
        'Editar quantidade e informações',
        'Adicionar voluntários ao módulo',
        'Visualizar relatórios',
      ],
      associated: [
        'Cadastrar novos recursos',
        'Editar quantidade e informações',
        'Visualizar estoque',
      ],
      viewer: ['Visualizar estoque (somente leitura)'],
    },
  },
  volunteers: {
    purpose:
      'Gerenciar a equipe de voluntários do abrigo, incluindo cadastro, escala de trabalho e funções atribuídas.',
    permissions: {
      admin: [
        'Cadastrar novos voluntários',
        'Editar informações',
        'Remover voluntários',
        'Ativar/Desativar módulo',
        'Atribuir responsável',
        'Adicionar voluntários ao módulo',
        'Definir permissões',
      ],
      responsible: [
        'Cadastrar novos voluntários',
        'Editar informações',
        'Adicionar voluntários ao módulo',
        'Visualizar escalas',
      ],
      associated: [
        'Cadastrar novos voluntários',
        'Editar informações',
        'Visualizar lista',
      ],
      viewer: ['Visualizar lista de voluntários (somente leitura)'],
    },
  },
  animals: {
    purpose:
      'Registrar e acompanhar animais de estimação que acompanham os abrigados, garantindo cuidados adequados.',
    permissions: {
      admin: [
        'Cadastrar novos animais',
        'Editar informações',
        'Excluir registros',
        'Ativar/Desativar módulo',
        'Atribuir responsável',
        'Adicionar voluntários',
        'Visualizar histórico',
      ],
      responsible: [
        'Cadastrar novos animais',
        'Editar informações',
        'Adicionar voluntários ao módulo',
        'Visualizar histórico',
      ],
      associated: [
        'Cadastrar novos animais',
        'Editar informações',
        'Visualizar registros',
      ],
      viewer: ['Visualizar registros (somente leitura)'],
    },
  },
  reports: {
    purpose:
      'Gerar relatórios e análises sobre as operações do abrigo, incluindo ocupação, recursos consumidos e atendimentos realizados.',
    permissions: {
      admin: [
        'Gerar todos os tipos de relatórios',
        'Exportar dados',
        'Configurar relatórios personalizados',
        'Ativar/Desativar módulo',
        'Atribuir responsável',
        'Adicionar voluntários',
      ],
      responsible: [
        'Gerar relatórios padrão',
        'Exportar dados',
        'Adicionar voluntários ao módulo',
      ],
      associated: ['Gerar relatórios básicos', 'Visualizar dados'],
      viewer: ['Visualizar relatórios existentes (somente leitura)'],
    },
  },
}

export function ModuleDisclaimerModal({
  onClose,
  module,
  responsibleName,
  adminName,
  isUserAdmin,
  isUserResponsible,
  isUserAssociated,
}: ModuleDisclaimerModalProps) {
  const details = MODULE_DETAILS[module.key]

  if (!details) return null

  const getUserRole = () => {
    if (isUserAdmin) return 'admin'
    if (isUserResponsible) return 'responsible'
    if (isUserAssociated) return 'associated'
    return 'viewer'
  }

  const userRole = getUserRole()
  const userPermissions = details.permissions[userRole]

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: 'Administrador',
      responsible: 'Responsável pelo Módulo',
      associated: 'Voluntário Associado',
      viewer: 'Visualizador',
    }
    return labels[role] || 'Usuário'
  }

  return (
    <Modal.Root onClose={onClose}>
      <Modal.Header title={`${module.icon} ${module.title}`} onClose={onClose} />
      <Modal.Content>
        <div className={styles.content}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Propósito do Módulo</h3>
            <p className={styles.purpose}>{details.purpose}</p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Responsável</h3>
            <p className={styles.responsibleText}>
              {responsibleName ? (
                <>
                  <strong>{responsibleName}</strong> é o responsável por este
                  módulo.
                </>
              ) : (
                <>
                  <strong>{adminName}</strong> (Administrador) é o responsável
                  por este módulo.
                </>
              )}
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Suas Permissões ({getRoleLabel(userRole)})
            </h3>
            <ul className={styles.permissionsList}>
              {userPermissions.map((permission, index) => (
                <li key={index} className={styles.permissionItem}>
                  <span className={styles.checkIcon}>✓</span>
                  {permission}
                </li>
              ))}
            </ul>
          </section>

          {isUserAdmin && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>
                Outras Permissões no Sistema
              </h3>

              <div className={styles.rolePermissions}>
                <h4 className={styles.roleTitle}>Responsável pelo Módulo</h4>
                <ul className={styles.permissionsList}>
                  {details.permissions.responsible.map((permission, index) => (
                    <li key={index} className={styles.permissionItem}>
                      <span className={styles.checkIcon}>✓</span>
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.rolePermissions}>
                <h4 className={styles.roleTitle}>Voluntário Associado</h4>
                <ul className={styles.permissionsList}>
                  {details.permissions.associated.map((permission, index) => (
                    <li key={index} className={styles.permissionItem}>
                      <span className={styles.checkIcon}>✓</span>
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>
      </Modal.Content>
      <Modal.Footer>
        <Modal.Actions>
          <Button type="button" variant="primary" onClick={onClose}>
            Entendi
          </Button>
        </Modal.Actions>
      </Modal.Footer>
    </Modal.Root>
  )
}
