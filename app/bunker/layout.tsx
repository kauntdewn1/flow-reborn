'use client'

import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ROUTES = {
  LOGIN: '/login',
  ACESSO_NEGADO: '/acesso-negado',
  ERRO: '/erro'
} as const

export default function BunkerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const timeoutId = setTimeout(async function verificarAcesso() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Erro na autenticação:', error.message)
          router.push(`${ROUTES.LOGIN}?redirect=/bunker`)
          return
        }

        if (!session) {
          router.push(`${ROUTES.LOGIN}?redirect=/bunker`)
          return
        }

        const { data: user, error: userError } = await supabase
          .from('users')
          .select('acesso_bunker')
          .eq('id', session.user.id)
          .single()

        if (userError) {
          console.error('Erro ao verificar acesso:', userError.message)
          router.push(ROUTES.ERRO)
          return
        }

        if (!user?.acesso_bunker) {
          router.push(ROUTES.ACESSO_NEGADO)
        }
      } catch (error) {
        console.error('Erro crítico:', error instanceof Error ? error.message : 'Erro desconhecido')
        router.push(ROUTES.ERRO)
      }
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [router])

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#22c55e',
            border: '1px solid #22c55e',
            fontFamily: 'monospace',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#000',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#000',
            },
          },
        }}
      />
    </div>
  )
}
