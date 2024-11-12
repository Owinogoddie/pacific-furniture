// src/components/Providers.tsx
'use client'

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { Toaster } from 'sonner'

export default function Providers({
  children,
  initialSession,
}: {
  children: React.ReactNode
  initialSession: any
}) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={initialSession}
    >
      {children}
      <Toaster richColors closeButton position="bottom-center" />
    </SessionContextProvider>
  )
}