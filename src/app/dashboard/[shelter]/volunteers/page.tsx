'use client'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import styles from './Volunteers.module.scss'

const VOLUNTEERS = [
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

export default function VolunteersPage() {
  const [search, setSearch] = useState('')
  const filtered = VOLUNTEERS.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <>
      <h1 className={styles.title}>Gestão de Voluntários</h1>
      <div className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Total de Voluntários</span>
          <span className={styles.metricValue}>45</span>
          <span className={styles.metricSub}>+5% este mês</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Voluntários Ativos Hoje</span>
          <span className={styles.metricValue}>28</span>
          <span className={styles.metricSub}>Em 3 abrigos</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Próximos Turnos</span>
          <span className={styles.metricValue}>12</span>
          <span className={styles.metricSub}>Nas próximas 24h</span>
        </div>
      </div>

      <div className={styles.listSection}>
        <div className={styles.listHeader}>
          <div>
            <h2 className={styles.listTitle}>Lista de Voluntários</h2>
            <span className={styles.listDesc}>
              Gerencie os voluntários registrados e suas informações.
            </span>
          </div>
          <div className={styles.actions}>
            <Input
              className={styles.searchInput}
              placeholder="Buscar voluntário..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
            <Button className={styles.addBtn}>Adicionar Voluntário</Button>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Contato</th>
                <th>Email</th>
                <th>Habilidades</th>
                <th>Status</th>
                <th>Última Atividade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={i}>
                  <td>{v.name}</td>
                  <td>{v.phone}</td>
                  <td>{v.email}</td>
                  <td>
                    {v.skills.map((s, idx) => (
                      <span key={idx} className={styles.skillTag}>
                        {s}
                      </span>
                    ))}
                  </td>
                  <td>
                    <span className={styles[`status${v.status}`]}>
                      {v.status}
                    </span>
                  </td>
                  <td>{v.lastActivity}</td>
                  <td>
                    <Button variant="ghost">...</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.tasksBlock}>
          <h3>Atribuição de Tarefas</h3>
          <ul>
            <li>
              Distribuição de Alimentos (Abrigo A)
              <span className={styles.taskTag}>Pendente</span>
            </li>
            <li>
              Triagem de Doações (Centro Logístico)
              <span className={styles.taskTag}>Atribuída (Ana Silva)</span>
            </li>
            <li>
              Apoio Emocional (Abrigo C)
              <span className={styles.taskTag}>Pendente</span>
            </li>
            <li>
              Limpeza Geral (Abrigo B)
              <span className={styles.taskTag}>Pendente</span>
            </li>
            <li>
              Cuidado de Animais (Abrigo A)
              <span className={styles.taskTag}>Atribuída (Sofia Oliveira)</span>
            </li>
          </ul>
          <Button variant="ghost" className={styles.seeAllBtn}>
            Ver Todas as Tarefas
          </Button>
        </div>
        <div className={styles.shiftsBlock}>
          <h3>Disponibilidade & Turnos</h3>
          <ul>
            <li>
              24/07, 08:00 - 12:00 <span>Carlos Mendes</span>
            </li>
            <li>
              24/07, 14:00 - 18:00 <span>Ana Silva</span>
            </li>
            <li>
              25/07, 09:00 - 13:00 <span>Sofia Oliveira</span>
            </li>
            <li>
              25/07, 10:00 - 14:00 <span>Miguel Santos</span>
            </li>
          </ul>
          <Button variant="ghost" className={styles.seeAllBtn}>
            Ver Calendário Completo
          </Button>
        </div>
      </div>
    </>
  )
}
