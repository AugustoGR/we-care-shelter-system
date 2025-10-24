'use client'
import React, { useState } from 'react'

import Image from 'next/image'

import styles from './Resources.module.scss'

// const initialForm = {
//   nome: '',
//   categoria: '',
//   quantidade: '',
//   unidade: '',
//   validade: '',
//   status: 'Em Estoque',
// }

const categorias = ['Alimentos', 'Medicamentos', 'Higiene', 'Água']
// const unidades = [
//   'pacotes',
//   'cartelas',
//   'unidades',
//   'garrafões',
//   'rolos',
//   'latas',
// ]

export default function Resources() {
  // const [form, setForm] = useState(initialForm)
  const [resources, setResources] = useState([
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
      validade: '2025-01-15',
      status: 'Em Estoque',
    },
    {
      nome: 'Água Mineral 5L',
      categoria: 'Água',
      quantidade: 5,
      unidade: 'garrafões',
      validade: '2024-06-01',
      status: 'Vencido',
    },
    {
      nome: 'Ataduras Estéreis',
      categoria: 'Medicamentos',
      quantidade: 8,
      unidade: 'rolos',
      validade: '2024-11-01',
      status: 'Estoque Baixo',
    },
    {
      nome: 'Feijão 1kg',
      categoria: 'Alimentos',
      quantidade: 45,
      unidade: 'pacotes',
      validade: '2025-10-20',
      status: 'Em Estoque',
    },
    {
      nome: 'Fraldas G',
      categoria: 'Higiene',
      quantidade: 20,
      unidade: 'pacotes',
      validade: '2026-03-01',
      status: 'Em Estoque',
    },
    {
      nome: 'Máscaras Cirúrgicas',
      categoria: 'Medicamentos',
      quantidade: 200,
      unidade: 'unidades',
      validade: '2024-09-01',
      status: 'Em Estoque',
    },
    {
      nome: 'Lenços Umedecidos',
      categoria: 'Higiene',
      quantidade: 7,
      unidade: 'pacotes',
      validade: '2024-08-10',
      status: 'Estoque Baixo',
    },
    {
      nome: 'Leite em Pó',
      categoria: 'Alimentos',
      quantidade: 10,
      unidade: 'latas',
      validade: '2024-07-15',
      status: 'Estoque Baixo',
    },
  ])
  const [search, setSearch] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')

  const filteredResources = resources.filter((item) => {
    const matchNome = item.nome.toLowerCase().includes(search.toLowerCase())
    const matchCategoria = categoriaFiltro
      ? item.categoria === categoriaFiltro
      : true
    return matchNome && matchCategoria
  })

  const totalRecursos = resources.length
  const estoqueBaixo = resources.filter(
    (r) => r.status === 'Estoque Baixo',
  ).length
  const itensAtivos = resources.filter((r) => r.status === 'Em Estoque').length
  const proximosVencer = resources.filter((r) => {
    if (!r.validade) return false
    const hoje = new Date()
    const validade = new Date(r.validade)
    const diff = validade.getTime() - hoje.getTime()
    const dias = diff / (1000 * 60 * 60 * 24)
    return dias > 0 && dias <= 60
  }).length

  return (
    <>
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Gerenciamento de Recursos</h1>
        <div className={styles.headerButtons}>
          <button className={styles.addButton}>
            <Image
              src="/img/icons/circle-plus-icon.svg"
              alt=""
              width={20}
              height={20}
            />
            Adicionar Recurso
          </button>
          <button className={styles.exportButton}>
            <Image
              src="/img/icons/arrow-up-from-line-icon.svg"
              alt=""
              width={16}
              height={16}
            />
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total de Recursos</span>
          <Image
            src="/img/nav/package-icon.svg"
            alt=""
            width={16}
            height={16}
            className={styles.statIcon}
          />
          <span className={styles.statValue}>{totalRecursos}</span>
        </div>
        <div className={`${styles.statCard} ${styles.statCardWarning}`}>
          <span className={styles.statLabel}>Estoque Baixo</span>
          <Image
            src="/img/nav/bell-ring-icon.svg"
            alt=""
            width={16}
            height={16}
            className={styles.statIcon}
          />
          <span className={styles.statValue}>{estoqueBaixo}</span>
        </div>
        <div className={`${styles.statCard} ${styles.statCardOrange}`}>
          <span className={styles.statLabel}>Próximos a Vencer</span>
          <Image
            src="/img/nav/file-text-icon.svg"
            alt=""
            width={16}
            height={16}
            className={styles.statIcon}
          />
          <span className={styles.statValue}>{proximosVencer}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Itens Ativos</span>
          <Image
            src="/img/nav/toggle-left-icon.svg"
            alt=""
            width={16}
            height={16}
            className={styles.statIcon}
          />
          <span className={styles.statValue}>{itensAtivos}</span>
        </div>
      </div>

      {/* Inventory Section */}
      <h2 className={styles.sectionTitle}>Inventário Detalhado</h2>

      {/* Filter Buttons */}
      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterBtn} ${categoriaFiltro === '' ? styles.filterBtnActive : ''}`}
          onClick={() => setCategoriaFiltro('')}
        >
          Todos
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${categoriaFiltro === cat ? styles.filterBtnActive : ''}`}
            onClick={() => setCategoriaFiltro(cat)}
          >
            {cat}
          </button>
        ))}
        <div className={styles.searchBox}>
          <Image
            src="/img/icons/search-icon.svg"
            alt=""
            width={16}
            height={16}
            className={styles.searchIcon}
          />
          <input
            type="text"
            placeholder="Buscar recurso..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>NOME</th>
                <th>CATEGORIA</th>
                <th>QUANTIDADE</th>
                <th>UNIDADE</th>
                <th>VALIDADE</th>
                <th>STATUS</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.nome}</td>
                  <td>{item.categoria}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.unidade}</td>
                  <td>{item.validade}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${styles[`status${item.status.replace(/ /g, '')}`]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className={styles.actionsCell}>
                    <button className={styles.actionButton}>Editar</button>
                    <button className={styles.actionButton}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button className={styles.paginationButton}>Anterior</button>
        <button
          className={`${styles.paginationButton} ${styles.paginationActive}`}
        >
          1
        </button>
        <button className={styles.paginationButton}>Próximo</button>
      </div>
    </>
  )
}
