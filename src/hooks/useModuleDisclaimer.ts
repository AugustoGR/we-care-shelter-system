import { useState, useCallback } from 'react'

interface ModuleInfo {
  key: string
  title: string
  icon: string
  desc: string
}

interface UseModuleDisclaimerReturn {
  isDisclaimerOpen: boolean
  disclaimerModule: ModuleInfo | null
  openDisclaimer: (module: ModuleInfo) => void
  closeDisclaimer: () => void
}

/**
 * Hook para gerenciar o estado do disclaimer de módulos
 * @returns Métodos e estado para controlar a modal de disclaimer
 */
export function useModuleDisclaimer(): UseModuleDisclaimerReturn {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false)
  const [disclaimerModule, setDisclaimerModule] = useState<ModuleInfo | null>(
    null,
  )

  const openDisclaimer = useCallback((module: ModuleInfo) => {
    setDisclaimerModule(module)
    setIsDisclaimerOpen(true)
  }, [])

  const closeDisclaimer = useCallback(() => {
    setIsDisclaimerOpen(false)
    setDisclaimerModule(null)
  }, [])

  return {
    isDisclaimerOpen,
    disclaimerModule,
    openDisclaimer,
    closeDisclaimer,
  }
}
