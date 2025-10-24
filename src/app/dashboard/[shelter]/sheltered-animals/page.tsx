'use client'
import React, { useState } from 'react'

import { Modal } from '@/components/layout/Modal'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import styles from './ShelteredAnimals.module.scss'

const ANIMALS = [
  {
    name: 'Tobby',
    species: 'Cachorro',
    breed: 'Labrador',
    age: 3,
    sex: 'Macho',
    health: 'Em Cuidado',
    status: 'Em Cuidado',
    photo: '',
  },
  {
    name: 'Mia',
    species: 'Gato',
    breed: 'Siamês',
    age: 1,
    sex: 'Fêmea',
    health: 'Aguardando Adoção',
    status: 'Aguardando Adoção',
    photo: '',
  },
  {
    name: 'Rex',
    species: 'Cachorro',
    breed: 'Pastor Alemão',
    age: 5,
    sex: 'Macho',
    health: 'Em Cuidado',
    status: 'Em Cuidado',
    photo: '',
  },
  {
    name: 'Luna',
    species: 'Gato',
    breed: 'Persa',
    age: 2,
    sex: 'Fêmea',
    health: 'Em Cuidado',
    status: 'Em Cuidado',
    photo: '',
  },
  {
    name: 'Buddy',
    species: 'Cachorro',
    breed: 'Golden Retriever',
    age: 4,
    sex: 'Macho',
    health: 'Adotado',
    status: 'Adotado',
    photo: '',
  },
  {
    name: 'Whiskers',
    species: 'Gato',
    breed: 'Vira-lata',
    age: 7,
    sex: 'Fêmea',
    health: 'Reunido',
    status: 'Reunido',
    photo: '',
  },
]

export default function ShelteredAnimalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    sex: 'Macho',
    health: 'Saudável',
    care: '',
    rabies: false,
    cinomose: false,
    parvo: false,
    felina: false,
    photo: null as File | null,
  })
  const [search, setSearch] = useState('')
  const filtered = ANIMALS.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.species.toLowerCase().includes(search.toLowerCase()) ||
      a.breed.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', form)
    setIsModalOpen(false)
    setForm({
      name: '',
      species: '',
      breed: '',
      age: '',
      sex: 'Macho',
      health: 'Saudável',
      care: '',
      rabies: false,
      cinomose: false,
      parvo: false,
      felina: false,
      photo: null,
    })
  }

  return (
    <>
      <h1 className={styles.title}>Gerenciamento de Animais</h1>

      <div className={styles.listBlock}>
        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>Animais no Abrigo</h2>
          <span className={styles.listDesc}>
            Lista completa de animais abrigados e seus status.
          </span>
          <div className={styles.listActions}>
            <Select className={styles.select}>
              <option value="">Todos</option>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
            </Select>
            <Button onClick={() => setIsModalOpen(true)}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1.16667V12.8333M1.16667 7H12.8333"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Adicionar Animal
            </Button>
            <div className={styles.searchWrapper}>
              <svg
                className={styles.searchIcon}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="7.66667"
                  cy="7.66667"
                  r="5.66667"
                  stroke="#565D6D"
                  strokeWidth="1.5"
                />
                <path
                  d="M11.6667 11.6667L14 14"
                  stroke="#565D6D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <Input
                className={styles.searchInput}
                placeholder="Buscar por nome, espécie ou raça..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>Espécie</th>
                <th>Raça</th>
                <th>Idade</th>
                <th>Sexo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={i}>
                  <td>
                    <div className={styles.animalPhoto} />
                  </td>
                  <td>{a.name}</td>
                  <td>{a.species}</td>
                  <td>{a.breed}</td>
                  <td>{a.age}</td>
                  <td>{a.sex}</td>
                  <td>
                    <span
                      className={styles[`status${a.status.replace(/ /g, '')}`]}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button type="button">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.334 1.333L14.667 4.667M1.333 14.667l2.953-2.953a1.333 1.333 0 01.488-.314l4.56-1.52a.667.667 0 00.386-.386l1.52-4.56a1.333 1.333 0 01.314-.488L14.667 1.333l-3.334 3.334a1.333 1.333 0 01-.488.314l-4.56 1.52a.667.667 0 00-.386.386l-1.52 4.56a1.333 1.333 0 01-.314.488L1.333 14.667z"
                            stroke="#171A1F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button type="button">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v9.333a1.333 1.333 0 01-1.334 1.334H4.667a1.333 1.333 0 01-1.334-1.334V4h9.334z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.pagination}>
          <button type="button">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Previous
          </button>
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <button type="button">
            Next
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12l4-4-4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <Modal.Root>
          <Modal.Header title="Registrar Novo Animal">
            <button
              onClick={() => setIsModalOpen(false)}
              className={styles.closeButton}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Modal.Header>
          <Modal.Content>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <span className={styles.formDesc}>
                Preencha os detalhes para adicionar um animal ao abrigo.
              </span>

              <div className={styles.formGroup}>
                <label>Nome</label>
                <Input
                  placeholder="Nome do animal"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Espécie</label>
                <Input
                  placeholder="Cachorro, Gato, etc."
                  value={form.species}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, species: e.target.value }))
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Raça</label>
                <Input
                  placeholder="Labrador, Siamês, etc."
                  value={form.breed}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, breed: e.target.value }))
                  }
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Idade (anos)</label>
                  <Input
                    placeholder="Idade em anos"
                    value={form.age}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, age: e.target.value }))
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Sexo</label>
                  <Select
                    value={form.sex}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, sex: e.target.value }))
                    }
                    className={styles.select}
                  >
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </Select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Estado de Saúde</label>
                <Select
                  value={form.health}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, health: e.target.value }))
                  }
                  className={styles.select}
                >
                  <option value="Saudável">Saudável</option>
                  <option value="Em Cuidado">Em Cuidado</option>
                  <option value="Aguardando Adoção">Aguardando Adoção</option>
                  <option value="Adotado">Adotado</option>
                  <option value="Reunido">Reunido</option>
                </Select>
              </div>

              <div className={styles.formGroup}>
                <label>Requisitos de Cuidado</label>
                <Textarea
                  className={styles.textarea}
                  placeholder="Descreva quaisquer necessidades especiais ou requisitos de cuidado."
                  value={form.care}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, care: e.target.value }))
                  }
                />
              </div>

              <div>
                <span className={styles.vaccineLabel}>Vacinação</span>
                <div className={styles.vaccinesRow}>
                  <label>
                    <Checkbox
                      checked={form.rabies}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, rabies: e.target.checked }))
                      }
                    />
                    Raiva
                  </label>
                  <label>
                    <Checkbox
                      checked={form.cinomose}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, cinomose: e.target.checked }))
                      }
                    />
                    Cinomose
                  </label>
                  <label>
                    <Checkbox
                      checked={form.parvo}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, parvo: e.target.checked }))
                      }
                    />
                    Parvovirose
                  </label>
                  <label>
                    <Checkbox
                      checked={form.felina}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, felina: e.target.checked }))
                      }
                    />
                    Felina
                  </label>
                </div>
              </div>

              <div className={styles.fileUpload}>
                <label className={styles.fileLabel}>Foto do Animal</label>
                <label htmlFor="photo-upload" className={styles.fileButton}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.667 10v2.667A1.333 1.333 0 0113.333 14H2.667a1.333 1.333 0 01-1.334-1.333V10M11.333 5.333L8 2m0 0L4.667 5.333M8 2v8"
                      stroke="#171A1F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {form.photo ? form.photo.name : 'Escolher arquivo'}
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      photo: e.target.files?.[0] || null,
                    }))
                  }
                />
                <span className={styles.fileDesc}>
                  Envie uma foto clara do animal.
                </span>
              </div>

              <div className={styles.formActions}>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Salvar Animal</Button>
              </div>
            </form>
          </Modal.Content>
        </Modal.Root>
      )}
    </>
  )
}
