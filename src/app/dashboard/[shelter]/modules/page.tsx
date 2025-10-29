'use client'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

import { useModules } from './hooks/useModules'
import styles from './Modules.module.scss'

export default function ModulesPage() {
  const { modules, moduleStates, handleToggle } = useModules()

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
