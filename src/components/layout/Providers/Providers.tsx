'use client'

import React from 'react'
import { Provider } from 'react-redux'

import { AuthProvider } from '@/contexts/AuthContext'
import { store } from '@/store'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  )
}
