/**
 * Formata um CEP no padrão brasileiro (00000-000)
 */
export function formatCEP(cep: string): string {
  // Remove tudo que não é número
  const numbers = cep.replace(/\D/g, '')

  // Aplica a máscara
  if (numbers.length <= 5) {
    return numbers
  }

  return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
}

/**
 * Remove a formatação do CEP, deixando apenas números
 */
export function unformatCEP(cep: string): string {
  return cep.replace(/\D/g, '')
}

/**
 * Valida se um CEP é válido (formato: 00000-000 ou 00000000)
 */
export function isValidCEP(cep: string): boolean {
  const numbers = cep.replace(/\D/g, '')
  return numbers.length === 8
}

/**
 * Formata nome próprio (primeira letra de cada palavra maiúscula)
 */
export function formatProperName(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
      return word
    })
    .join(' ')
}

/**
 * Formata a distância de tempo até agora (ex: "2 horas atrás")
 */
export function formatDistanceToNow(date: string | Date): string {
  const now = new Date()
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const diffInMs = now.getTime() - dateObj.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) {
    return 'agora'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'} atrás`
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'} atrás`
  } else {
    return `${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'} atrás`
  }
}

/**
 * Retorna a configuração de cores para o status do abrigo
 */
export function getShelterStatusConfig(active: boolean) {
  if (active) {
    return {
      status: 'Ativo',
      tagBg: 'rgba(0, 0, 0, 0)',
      tagText: '#171A1F',
      tagBorder: '#DEE1E6',
    }
  }
  return {
    status: 'Inativo',
    tagBg: '#F3F4F6',
    tagText: '#565D6D',
    tagBorder: '#F3F4F6',
  }
}

/**
 * Formata data no formato brasileiro
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/**
 * Formata data e hora no formato brasileiro
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
