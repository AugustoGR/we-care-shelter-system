'use client'
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Header } from '@/components/layout/Header/Header'

import styles from './Shelters.module.scss'

const shelters = [
  {
    name: 'Abrigo Esperança',
    calamity: 'Inundação',
    status: 'Ativo',
    tagBg: 'rgba(0, 0, 0, 0)',
    tagText: '#171A1F',
    tagBorder: '#DEE1E6',
    slug: 'abrigo-esperanca',
  },
  {
    name: 'Centro Comunitário Sol',
    calamity: 'Deslizamento de Terra',
    status: 'Emergência',
    tagBg: '#E45B63',
    tagText: '#FFFFFF',
    tagBorder: '#E45B63',
    slug: 'centro-comunitario-sol',
  },
  {
    name: 'Escola Municipal Alegria',
    calamity: 'Incêndio Florestal',
    status: 'Inativo',
    tagBg: '#F3F4F6',
    tagText: '#565D6D',
    tagBorder: '#F3F4F6',
    slug: 'escola-municipal-alegria',
  },
  {
    name: 'Ginásio Urbano Vida',
    calamity: 'Vendaval',
    status: 'Ativo',
    tagBg: 'rgba(0, 0, 0, 0)',
    tagText: '#171A1F',
    tagBorder: '#DEE1E6',
    slug: 'ginasio-urbano-vida',
  },
  {
    name: 'Parque da Cidade',
    calamity: 'Terremoto',
    status: 'Emergência',
    tagBg: '#E45B63',
    tagText: '#FFFFFF',
    tagBorder: '#E45B63',
    slug: 'parque-da-cidade',
  },
  {
    name: 'Refúgio Seguro',
    calamity: 'Tempestade Tropical',
    status: 'Ativo',
    tagBg: 'rgba(0, 0, 0, 0)',
    tagText: '#171A1F',
    tagBorder: '#DEE1E6',
    slug: 'refugio-seguro',
  },
  {
    name: 'Posto de Saúde Central',
    calamity: 'Gelo e Neve',
    status: 'Inativo',
    tagBg: '#F3F4F6',
    tagText: '#565D6D',
    tagBorder: '#F3F4F6',
    slug: 'posto-de-saude-central',
  },
  {
    name: 'Fazenda da Paz',
    calamity: 'Seca Severa',
    status: 'Ativo',
    tagBg: 'rgba(0, 0, 0, 0)',
    tagText: '#171A1F',
    tagBorder: '#DEE1E6',
    slug: 'fazenda-da-paz',
  },
  {
    name: 'Igreja da Redenção',
    calamity: 'Ciclone',
    status: 'Emergência',
    tagBg: '#E45B63',
    tagText: '#FFFFFF',
    tagBorder: '#E45B63',
    slug: 'igreja-da-redencao',
  },
]

export default function Shelters() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Meus Abrigos</h1>
          <Link href="/new-shelter" className={styles.addButton}>
            <Image
              src="/img/circle-plus-icon.svg"
              alt="Adicionar"
              width={16}
              height={16}
            />
            Adicionar Novo Abrigo
          </Link>
        </div>
        <div className={styles.searchBar}>
          <Image
            src="/img/search-icon.svg"
            alt="Buscar"
            width={20}
            height={20}
          />
          <input
            className={styles.searchInput}
            placeholder="Pesquisar abrigos por nome, tipo ou status..."
          />
        </div>
        <div className={styles.sheltersGrid}>
          {shelters.map((shelter, idx) => (
            <div className={styles.card} key={idx}>
              <div className={styles.cardTitle}>{shelter.name}</div>
              <div className={styles.cardCalamity}>
                Tipo de Calamidade: {shelter.calamity}
              </div>
              <div className={styles.cardStatusRow}>
                <span className={styles.cardStatusLabel}>Status:</span>
                <span
                  className={styles.cardStatusTag}
                  style={{
                    background: shelter.tagBg,
                    color: shelter.tagText,
                    borderColor: shelter.tagBorder,
                  }}>
                  {shelter.status}
                </span>
              </div>
              <Link
                href={`/dashboard/${shelter.slug}/modules`}
                className={styles.detailsButton}>
                Acessar
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
