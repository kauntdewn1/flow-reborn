'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface User {
  id: string
  codinome: string
  nivel: number
  pontos: number
  acesso_bunker: boolean
  ultimo_acesso: string
}

interface Modulo {
  id: string
  titulo: string
  progresso: number
  desbloqueado: boolean
  proxima_missao?: string
}

interface Missao {
  id: string
  titulo: string
  descricao: string
  prazo: string
  tipo: 'funil' | 'blackhat'
  prioridade: 'alta' | 'media' | 'baixa'
}

interface Ranking {
  codinome: string
  pontos: number
  nivel: number
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [modulos, setModulos] = useState<Modulo[]>([])
  const [missoes, setMissoes] = useState<Missao[]>([])
  const [ranking, setRanking] = useState<Ranking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    try {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        toast.error('Sessão expirada')
        return
      }

      const [userRes, modulosRes, missoesRes, rankingRes] = await Promise.all([
        supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single(),
        supabase
          .from('modulos')
          .select('*')
          .order('id'),
        supabase
          .from('missoes')
          .select('*')
          .eq('ativa', true)
          .order('prioridade', { ascending: false }),
        supabase
          .from('users')
          .select('codinome, pontos, nivel')
          .order('pontos', { ascending: false })
          .limit(5)
      ])

      if (userRes.error) throw userRes.error
      if (modulosRes.error) throw modulosRes.error
      if (missoesRes.error) throw missoesRes.error
      if (rankingRes.error) throw rankingRes.error

      setUser(userRes.data)
      setModulos(modulosRes.data || [])
      setMissoes(missoesRes.data || [])
      setRanking(rankingRes.data || [])
    } catch (error) {
      toast.error('Erro ao carregar dados')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-green-500 font-mono">
        <div className="animate-pulse">INICIALIZANDO SISTEMA...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-green-500 pb-4 mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">HUB OPERACIONAL</h1>
            <p className="text-sm opacity-75">
              Bem-vindo de volta, {user.codinome} | Nível {user.nivel}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{user.pontos} pontos</p>
            <p className="text-sm opacity-75">
              Último acesso: {new Date(user.ultimo_acesso).toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Acesso Rápido */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">ACESSO RÁPIDO</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/bunker">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 p-4 rounded border border-green-500 text-center"
            >
              <p className="text-2xl mb-2">🔐</p>
              <p className="font-bold">BUNKER</p>
              <p className="text-sm opacity-75">
                {user.acesso_bunker ? 'ACESSO LIBERADO' : 'ACESSO RESTRITO'}
              </p>
            </motion.div>
          </Link>

          <Link href="/mentoria">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 p-4 rounded border border-green-500 text-center"
            >
              <p className="text-2xl mb-2">🎯</p>
              <p className="font-bold">MENTORIA</p>
              <p className="text-sm opacity-75">PRÓXIMA SESSÃO</p>
            </motion.div>
          </Link>

          <Link href="/profile">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 p-4 rounded border border-green-500 text-center"
            >
              <p className="text-2xl mb-2">👤</p>
              <p className="font-bold">PERFIL</p>
              <p className="text-sm opacity-75">GERENCIAR DADOS</p>
            </motion.div>
          </Link>

          <Link href="/missoes">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 p-4 rounded border border-green-500 text-center"
            >
              <p className="text-2xl mb-2">🎖️</p>
              <p className="font-bold">MISSÕES</p>
              <p className="text-sm opacity-75">
                {missoes.length} PENDENTES
              </p>
            </motion.div>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progresso nos Módulos */}
        <section className="bg-gray-900 p-6 rounded border border-green-500">
          <h2 className="text-2xl font-bold mb-4">PROGRESSO</h2>
          <div className="space-y-4">
            {modulos.map(modulo => (
              <div key={modulo.id} className="bg-black p-4 rounded border border-green-500">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold">{modulo.titulo}</h3>
                  <span className="text-sm">
                    {modulo.progresso}% COMPLETO
                  </span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${modulo.progresso}%` }}
                  />
                </div>
                {modulo.proxima_missao && (
                  <p className="text-sm mt-2 opacity-75">
                    Próxima missão: {modulo.proxima_missao}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Ranking */}
        <section className="bg-gray-900 p-6 rounded border border-green-500">
          <h2 className="text-2xl font-bold mb-4">RANKING</h2>
          <div className="space-y-2">
            {ranking.map((rank, index) => (
              <motion.div
                key={rank.codinome}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-black p-4 rounded border ${
                  rank.codinome === user.codinome
                    ? 'border-yellow-500'
                    : 'border-green-500'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">#{index + 1}</span>
                    <span className="font-bold">{rank.codinome}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{rank.pontos} pontos</p>
                    <p className="text-sm opacity-75">Nível {rank.nivel}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Missões Pendentes */}
        <section className="lg:col-span-2 bg-gray-900 p-6 rounded border border-green-500">
          <h2 className="text-2xl font-bold mb-4">MISSÕES PENDENTES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {missoes.map(missao => (
              <motion.div
                key={missao.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black p-4 rounded border border-green-500"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{missao.titulo}</h3>
                  <span className={`text-sm px-2 py-1 rounded ${
                    missao.prioridade === 'alta'
                      ? 'bg-red-500 text-white'
                      : missao.prioridade === 'media'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-green-500 text-black'
                  }`}>
                    {missao.prioridade.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm opacity-75 mb-2">{missao.descricao}</p>
                <p className="text-xs text-red-500">
                  Prazo: {new Date(missao.prazo).toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
