'use client'

import { useEffect } from 'react'
import { useAuth } from '@/components/hooks/useAuth'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [])

  return <>{children}</>
}