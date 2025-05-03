'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function UpsellPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [temAcesso, setTemAcesso] = useState(false)

  useEffect(() => {
    verificarAcesso()
  }, [])

  async function verificarAcesso() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data } = await supabase
        .from('users')
        .select('acesso_bunker')
        .eq('id', session.user.id)
        .single()

      if (data?.acesso_bunker) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-red-500 font-mono">
        <div className="animate-pulse">CARREGANDO PORTAL...</div>
      </div>
    )
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black text-white px-4 py-16 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-red-600 animate-pulse">
        VOCÊ VIU 5%
      </h1>

      <p className="text-lg md:text-xl max-w-2xl mb-8 text-zinc-300">
        O resto está trancado dentro do bunker. Aqui só entra quem paga com ação.
        Quem prefere fazer parte do jogo ao invés de assistir.
      </p>

      <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-xl mb-8">
        <h2 className="text-2xl font-bold mb-4">Comparativo de acesso</h2>
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th></th>
              <th className="text-sm text-zinc-400">Gratuito</th>
              <th className="text-sm text-green-500">FLOW REBORN</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td>Acesso ao Bunker</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Mentorias Secretas</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Ranking e XP</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Desafios Recompensados</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Comunidade Estratégica</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={() => router.push('/invites')}
        className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-md text-lg font-semibold shadow-md transition-all strobe"
      >
        🔓 Quero desbloquear meu acesso
      </button>

      <div className="mt-12 text-sm text-zinc-500 max-w-md">
        "O mapa está nas suas mãos. Mas só os filhos do caos conseguem ler."
      </div>
    </section>
  )
}
