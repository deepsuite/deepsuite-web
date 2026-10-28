'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ConsultationRedirect() {
  const router = useRouter()
  useEffect(() => router.replace('/contact/'), [router])
  return null
}
