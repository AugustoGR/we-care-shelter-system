'use client'
import styles from '../(shelters)/Shelters.module.scss'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'

const calamities = [
  'Inundação',
  'Deslizamento de Terra',
  'Incêndio Florestal',
  'Vendaval',
  'Terremoto',
  'Tempestade Tropical',
  'Gelo e Neve',
  'Seca Severa',
  'Ciclone',
]

export default function NewShelter() {
  const [calamity, setCalamity] = useState('')
  const [active, setActive] = useState(true)

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Cadastro de Abrigo</h1>
        <h2 className={styles.formSubtitle}>
          Preencha os detalhes para registrar um novo abrigo emergencial.
        </h2>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="shelterName" className={styles.label}>
              Nome do Abrigo
            </label>
            <Input
              id="shelterName"
              type="text"
              placeholder="Ex: Abrigo Esperança"
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="description" className={styles.label}>
              Descrição do Abrigo
            </label>
            <textarea
              id="description"
              placeholder="Uma breve descrição sobre o abrigo e suas características."
              className={styles.textarea}
              rows={3}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Tipo de Calamidade</label>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={calamity}
                onChange={(e) => setCalamity(e.target.value)}
              >
                <option value="">Selecione o tipo de calamidade</option>
                {calamities.map((c, i) => (
                  <option value={c} key={i}>
                    {c}
                  </option>
                ))}
              </select>
              <Image
                src="/img/chevron-down.svg"
                alt="Abrir"
                width={16}
                height={16}
                className={styles.selectIcon}
              />
            </div>
          </div>
          <div className={styles.inputGroupRow}>
            <div className={styles.inputGroupHalf}>
              <label htmlFor="address" className={styles.label}>
                Endereço
              </label>
              <Input
                id="address"
                type="text"
                placeholder="Endereço (Ex: Rua da Paz, 123)"
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroupHalf}>
              <label htmlFor="city" className={styles.label}>
                Cidade
              </label>
              <Input
                id="city"
                type="text"
                placeholder="Cidade"
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroupHalf}>
              <label htmlFor="state" className={styles.label}>
                Estado
              </label>
              <div className={styles.selectWrapper}>
                <select id="state" className={styles.select}>
                  <option value="">Estado</option>
                  <option value="SP">SP</option>
                  <option value="RJ">RJ</option>
                  <option value="MG">MG</option>
                  <option value="RS">RS</option>
                  <option value="SC">SC</option>
                  <option value="PR">PR</option>
                  <option value="BA">BA</option>
                  <option value="PE">PE</option>
                  <option value="CE">CE</option>
                  <option value="AM">AM</option>
                  <option value="PA">PA</option>
                  <option value="GO">GO</option>
                  <option value="DF">DF</option>
                  {/* ...outros estados... */}
                </select>
                <Image
                  src="/img/chevron-down.svg"
                  alt="Abrir"
                  width={16}
                  height={16}
                  className={styles.selectIcon}
                />
              </div>
            </div>
            <div className={styles.inputGroupHalf}>
              <label htmlFor="cep" className={styles.label}>
                CEP
              </label>
              <Input
                id="cep"
                type="text"
                placeholder="CEP"
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.statusRow}>
            <span className={styles.statusLabel}>Abrigo Ativo</span>
            <Switch
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          </div>
          <div className={styles.buttonRow}>
            <Button
              type="button"
              variant="ghost"
              className={styles.cancelButton}
            >
              Cancelar
            </Button>
            <Button type="submit" className={styles.saveButton}>
              Salvar Abrigo
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
