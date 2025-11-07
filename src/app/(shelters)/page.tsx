'use client'
import React from 'react'

import Image from 'next/image'

import { Header } from '@/components/layout/Header/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LinkButton } from '@/components/ui/link-button'
import { useAuth } from '@/contexts/AuthContext'
import { getShelterStatusConfig } from '@/utils/formatters'

import { useShelters } from './hooks/useShelters'
import styles from './Shelters.module.scss'

export default function Shelters() {
  const { user } = useAuth()
  const {
    loading,
    searchTerm,
    setSearchTerm,
    error,
    filteredShelters,
    loadShelters,
  } = useShelters()

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Abrigos</h1>
          <LinkButton
            href="/new-shelter"
            variant="default"
            icon={
              <Image
                src="/img/circle-plus-icon.svg"
                alt="Adicionar"
                width={16}
                height={16}
              />
            }
            iconPosition="left"
          >
            Adicionar Novo Abrigo
          </LinkButton>
        </div>
        <div className={styles.searchBar}>
          <Input
            icon="/img/search-icon.svg"
            placeholder="Pesquisar abrigos por nome, tipo ou status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className={styles.loadingMessage}>Carregando abrigos...</div>
        ) : error ? (
          <div className={styles.errorMessage}>
            {error}
            <Button onClick={loadShelters} variant="primary">
              Tentar novamente
            </Button>
          </div>
        ) : filteredShelters.length === 0 ? (
          <div className={styles.emptyMessage}>
            {searchTerm
              ? 'Nenhum abrigo encontrado com esse termo de busca.'
              : 'Nenhum abrigo disponível no momento. Clique em "Adicionar Novo Abrigo" para criar o primeiro.'}
          </div>
        ) : (
          <div className={styles.sheltersGrid}>
            {filteredShelters.map((shelter) => {
              const { status, tagBg, tagText, tagBorder } =
                getShelterStatusConfig(shelter.active)
              const isOwner = user && shelter.ownerId === user.id
              return (
                <div className={styles.card} key={shelter.id}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>{shelter.name}</div>
                    {isOwner && (
                      <span className={styles.ownerBadge}>Proprietário</span>
                    )}
                  </div>
                  <div className={styles.cardCalamity}>
                    Tipo de Calamidade: {shelter.calamity}
                  </div>
                  <div className={styles.cardStatusRow}>
                    <span className={styles.cardStatusLabel}>Status:</span>
                    <span
                      className={styles.cardStatusTag}
                      style={{
                        background: tagBg,
                        color: tagText,
                        borderColor: tagBorder,
                      }}
                    >
                      {status}
                    </span>
                  </div>
                  <LinkButton
                    className="ml-auto"
                    href={`/dashboard/${shelter.id}/modules`}
                    variant="outline"
                  >
                    Acessar
                  </LinkButton>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}
