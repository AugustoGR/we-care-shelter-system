import React, { useState, useEffect, useRef } from 'react'

import styles from './Autocomplete.module.scss'

export interface AutocompleteOption {
  id: string
  label: string
  email?: string
}

interface AutocompleteProps {
  id?: string
  name?: string
  value?: string
  onChange: (value: string, option?: AutocompleteOption) => void
  onSearch: (query: string) => Promise<AutocompleteOption[]>
  placeholder?: string
  minChars?: number
  disabled?: boolean
  required?: boolean
}

export function Autocomplete({
  id,
  name,
  onChange,
  onSearch,
  placeholder = 'Digite para buscar...',
  minChars = 3,
  disabled = false,
  required = false,
}: AutocompleteProps) {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<AutocompleteOption[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState<AutocompleteOption | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Buscar opções quando o input muda
  useEffect(() => {
    const search = async () => {
      if (inputValue.length >= minChars) {
        setIsLoading(true)
        try {
          const results = await onSearch(inputValue)
          setOptions(results)
          setIsOpen(true)
        } catch (error) {
          console.error('Error searching:', error)
          setOptions([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setOptions([])
        setIsOpen(false)
      }
    }

    const debounce = setTimeout(search, 300)
    return () => clearTimeout(debounce)
  }, [inputValue, minChars, onSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setSelectedOption(null)
    onChange('', undefined)
  }

  const handleOptionClick = (option: AutocompleteOption) => {
    setSelectedOption(option)
    setInputValue(option.email || option.label)
    setIsOpen(false)
    onChange(option.id, option)
  }

  const handleClear = () => {
    setInputValue('')
    setSelectedOption(null)
    setOptions([])
    onChange('', undefined)
  }

  return (
    <div ref={wrapperRef} className={styles.autocomplete}>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          name={name}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={styles.input}
          autoComplete="off"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Limpar"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {isLoading ? (
            <div className={styles.loading}>Buscando...</div>
          ) : options.length > 0 ? (
            <ul className={styles.optionList}>
              {options.map((option) => (
                <li
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className={styles.option}
                >
                  <div className={styles.optionContent}>
                    <span className={styles.optionLabel}>{option.label}</span>
                    {option.email && (
                      <span className={styles.optionEmail}>{option.email}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>
              {inputValue.length < minChars
                ? `Digite pelo menos ${minChars} caracteres`
                : 'Nenhum usuário encontrado'}
            </div>
          )}
        </div>
      )}

      {selectedOption && (
        <div className={styles.selectedInfo}>
          <span className={styles.selectedLabel}>
            Selecionado: {selectedOption.label}
          </span>
        </div>
      )}
    </div>
  )
}
