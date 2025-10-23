'use client'
import React, { useState } from 'react'

import Image from 'next/image'

import { ModalContent } from '@/components/layout/Modal/ModalContent'
import { ModalHeader } from '@/components/layout/Modal/ModalHeader'
import { ModalRoot } from '@/components/layout/Modal/ModalRoot'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import styles from './Sheltered.module.scss'

const initialForm = {
  nome: '',
  cpf: '',
  genero: '',
  dataNascimento: '',
  status: 'Ativo',
}

export default function Sheltered() {
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [sheltered, setSheltered] = useState([
    {
      nome: 'João Silva',
      cpf: '123.456.789-00',
      genero: 'Masculino',
      dataNascimento: '15/05/1988',
      status: 'Ativo',
    },
    {
      nome: 'Maria Oliveira',
      cpf: '987.654.321-00',
      genero: 'Feminino',
      dataNascimento: '22/11/1992',
      status: 'Ativo',
    },
    {
      nome: 'Carlos Pereira',
      cpf: '111.222.333-44',
      genero: 'Masculino',
      dataNascimento: '01/03/1975',
      status: 'Inativo',
    },
    {
      nome: 'Ana Souza',
      cpf: '555.666.777-88',
      genero: 'Feminino',
      dataNascimento: '30/07/2000',
      status: 'Pendente',
    },
    {
      nome: 'Pedro Lima',
      cpf: '444.333.222-11',
      genero: 'Masculino',
      dataNascimento: '10/01/1965',
      status: 'Ativo',
    },
  ])

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSheltered([...sheltered, form])
    setForm(initialForm)
    setModalOpen(false)
  }

  return (
    <>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Gestão de Abrigados</h1>
        <p className={styles.pageSubtitle}>
          Visualize e gerencie todos os indivíduos abrigados.
        </p>
        <Button onClick={() => setModalOpen(true)} className={styles.addButton}>
          <Image
            src="/img/icons/circle-plus-icon.svg"
            alt=""
            width={20}
            height={20}
          />
          Adicionar Novo Abrigados
        </Button>
      </div>

      {/* Filters and Search */}
      <div className={styles.filtersRow}>
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
            placeholder="Buscar abrigado..."
            className={styles.searchInput}
          />
        </div>

        <select name="status" className={styles.filterSelect}>
          <option value="">Status</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
          <option value="Pendente">Pendente</option>
        </select>

        <select name="genero" className={styles.filterSelect}>
          <option value="">Gênero</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>

        <select name="idade" className={styles.filterSelect}>
          <option value="">Idade</option>
          <option value="0-18">0-18 anos</option>
          <option value="19-30">19-30 anos</option>
          <option value="31-50">31-50 anos</option>
          <option value="51+">51+ anos</option>
        </select>

        <button className={styles.clearButton}>
          <Image
            src="/img/icons/circle-x-icon.svg"
            alt=""
            width={16}
            height={16}
          />
          Limpar Filtros
        </button>
      </div>

      {/* Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Lista de Abrigados</h2>
          <p className={styles.cardSubtitle}>
            Gerencie os detalhes de cada indivíduo abrigado.
          </p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>Gênero</th>
                <th>Status</th>
                <th className={styles.actionsHeader}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sheltered.map((item, idx) => (
                <tr key={idx}>
                  <td className={styles.nameCell}>{item.nome}</td>
                  <td>{item.cpf}</td>
                  <td>{item.dataNascimento}</td>
                  <td>{item.genero}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${styles[`status${item.status}`]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className={styles.actionsCell}>
                    <button className={styles.actionButton} title="Editar">
                      <Image
                        src="/img/icons/square-pen-icon.svg"
                        alt="Editar"
                        width={16}
                        height={16}
                      />
                    </button>
                    <button className={styles.actionButton} title="Excluir">
                      <Image
                        src="/img/icons/trash-icon.svg"
                        alt="Excluir"
                        width={16}
                        height={16}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de cadastro */}
      {modalOpen && (
        <ModalRoot>
          <ModalContent>
            <ModalHeader title="Cadastrar Novo Abrigado" />
            <form className={styles.form} onSubmit={handleSubmit}>
              <Input
                name="nome"
                placeholder="Nome"
                value={form.nome}
                onChange={handleInput}
                required
              />
              <Input
                name="cpf"
                placeholder="CPF"
                value={form.cpf}
                onChange={handleInput}
                required
              />
              <select
                name="genero"
                value={form.genero}
                onChange={handleInput}
                required
                className={styles.select}>
                <option value="">Gênero</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
              <Input
                name="dataNascimento"
                placeholder="Data de Nascimento"
                type="date"
                value={form.dataNascimento}
                onChange={handleInput}
                required
              />
              <select
                name="status"
                value={form.status}
                onChange={handleInput}
                required
                className={styles.select}>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Pendente">Pendente</option>
              </select>
              <Button type="submit">Cadastrar</Button>
            </form>
          </ModalContent>
        </ModalRoot>
      )}
    </>
  )
}
