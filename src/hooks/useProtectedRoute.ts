'use client'

import { useEffect } from 'react'

import { useRouter, usePathname } from 'next/navigation'

import { useAuth } from '@/contexts/AuthContext'

export function useProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const publicPaths = ['/login', '/logon']
    const isPublicPath = publicPaths.includes(pathname)

    if (!isLoading && !isAuthenticated && !isPublicPath) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, pathname, router])

  return { isAuthenticated, isLoading }
}
