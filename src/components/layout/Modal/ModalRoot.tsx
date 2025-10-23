'use client'
import React, { useEffect } from 'react'

import { useModal } from './hooks/useModal'
import style from './ModalRoot.module.scss'

export function ModalRoot({ children }: { children: React.ReactNode }) {
  const { testHook } = useModal()

  // Apenas um teste para dar um exemplificar o uso do hook

  //executado no serverside
  //  testHook()

  //executado no clientside
  useEffect(() => {
    testHook()
  }, [testHook])

  return (
    <div className={style.container}>
      <div className={style.wrapper}>{children}</div>
    </div>
  )
}
