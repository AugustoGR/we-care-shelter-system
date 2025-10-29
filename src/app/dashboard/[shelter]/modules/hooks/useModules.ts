import { useState } from 'react'

import { MODULES } from '../constants/modules'

export const useModules = () => {
  const [moduleStates, setModuleStates] = useState<Record<string, boolean>>(
    MODULES.reduce(
      (acc, mod) => ({ ...acc, [mod.key]: mod.active }),
      {} as Record<string, boolean>,
    ),
  )

  const handleToggle = (key: string) => {
    setModuleStates((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return {
    modules: MODULES,
    moduleStates,
    handleToggle,
  }
}
