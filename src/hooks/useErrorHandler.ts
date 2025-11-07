import { useCallback } from 'react'
import { toast } from 'react-toastify'

import { getErrorMessage } from '@/utils/errorMessages'

/**
 * Hook para tratamento de erros padronizado
 */
export function useErrorHandler() {
  const handleError = useCallback((error: any, customMessage?: string) => {
    const message = customMessage || getErrorMessage(error)
    toast.error(message)
    console.error('Error:', error)
  }, [])

  const handleSuccess = useCallback((message: string) => {
    toast.success(message)
  }, [])

  return {
    handleError,
    handleSuccess,
  }
}
