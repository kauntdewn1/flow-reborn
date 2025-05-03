'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'

interface User {
  id: string
  codinome: string
  divida: number
  email: string
  created_at: string
}

interface Modulo {
  id: string
  slug: string
  desbloqueado_por: string[]
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function PainelDoCaos() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [modulos, setModulos] = useState<Modulo[]>([])

  useEffect(() => {
    fetchUsers()
    fetchModulos()
  }, [])

  async function fetchUsers() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      toast.error('Erro ao carregar usuários')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchModulos() {
    try {
      const { data, error } = await supabase
        .from('modulos')
        .select('*')

      if (error) throw error
      setModulos(data || [])
    } catch (error) {
      toast.error('Erro ao carregar módulos')
      console.error(error)
    }
  }

  async function banUser(id: string, codinome: string) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      toast.success(`${codinome} foi banido com sucesso!`)
      fetchUsers()
    } catch (error) {
      toast.error('Erro ao banir usuário')
      console.error(error)
    }
  }

  async function liberarModulo(userId: string, moduloSlug: string) {
    try {
      const modulo = modulos.find(m => m.slug === moduloSlug)
      if (!modulo) throw new Error('Módulo não encontrado')

      const desbloqueados = modulo.desbloqueado_por || []
      const atualizados = [...new Set([...desbloqueados, userId])]

      const { error } = await supabase
        .from('modulos')
        .update({ desbloqueado_por: atualizados })
        .eq('id', modulo.id)

      if (error) throw error

      toast.success('Módulo liberado com sucesso!')
      fetchModulos()
    } catch (error) {
      toast.error('Erro ao liberar módulo')
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen p-8 font-mono">
      <h1 className="text-3xl font-bold text-red-600 mb-6">PAINEL DO CAOS</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {users.map(user => (
            <motion.div
              key={user.id}
              className="bg-gray-900 p-4 rounded shadow-xl border border-red-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-bold text-red-500">{user.codinome}</h2>
              <p className="text-sm text-gray-400">Email: {user.email}</p>
              <p className="text-sm">Dívida: R$ {user.divida.toFixed(2)}</p>
              <p className="text-xs text-gray-500">
                Criado em: {new Date(user.created_at).toLocaleDateString()}
              </p>
              
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => banUser(user.id, user.codinome)}
                  className="bg-red-700 hover:bg-red-900 px-4 py-2 rounded transition-colors"
                >
                  BANIR SEM DÓ
                </button>
                
                {modulos.map(modulo => (
                  <button
                    key={modulo.id}
                    onClick={() => liberarModulo(user.id, modulo.slug)}
                    className="bg-green-700 hover:bg-green-900 px-4 py-2 rounded transition-colors"
                  >
                    LIBERAR {modulo.slug.toUpperCase()}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
} 