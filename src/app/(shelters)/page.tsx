'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { Shelter } from '@/@types/shelterProps'
import { Header } from '@/components/layout/Header/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LinkButton } from '@/components/ui/link-button'
import { sheltersService } from '@/services'
import { getShelterStatusConfig } from '@/utils/formatters'

import styles from './Shelters.module.scss'

export default function Shelters() {
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadShelters()
  }, [])

  async function loadShelters() {
    try {
      setLoading(true)
      setError(null)
      const data = await sheltersService.findMyOwnedShelters()
      setShelters(data)
    } catch (err: any) {
      console.error('Erro ao carregar abrigos:', err)
      setError(err?.response?.data?.message || 'Erro ao carregar abrigos')
    } finally {
      setLoading(false)
    }
  }

  const filteredShelters = shelters.filter((shelter) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      shelter.name.toLowerCase().includes(searchLower) ||
      shelter.calamity.toLowerCase().includes(searchLower) ||
      shelter.city.toLowerCase().includes(searchLower)
    )
  })

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Meus Abrigos</h1>
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
              : 'Você ainda não cadastrou nenhum abrigo. Clique em "Adicionar Novo Abrigo" para começar.'}
          </div>
        ) : (
          <div className={styles.sheltersGrid}>
            {filteredShelters.map((shelter) => {
              const { status, tagBg, tagText, tagBorder } =
                getShelterStatusConfig(shelter.active)
              return (
                <div className={styles.card} key={shelter.id}>
                  <div className={styles.cardTitle}>{shelter.name}</div>
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
                    className='ml-auto'
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
