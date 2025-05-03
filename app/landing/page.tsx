'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const palavras = ['falido', 'fudido', 'quebrado', 'perdido']

export default function Landing() {
  const [palavraAtual, setPalavraAtual] = useState(0)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    // Troca de palavras
    const intervalo = setInterval(() => {
      setPalavraAtual((prev) => (prev + 1) % palavras.length)
    }, 2000)

    // Efeito glitch
    const glitchInterval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 100)
    }, 3000)

    return () => {
      clearInterval(intervalo)
      clearInterval(glitchInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background com Noise */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      
      {/* Efeito Strobe */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-[2px] animate-scan" />

      {/* Conteúdo Principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <Image
            src="https://res.cloudinary.com/dgyocpguk/image/upload/v1745797780/logo_horz_verm_ichwjl.png"
            alt="Logo"
            width={400}
            height={100}
            className={`${glitch ? 'animate-glitch' : 'animate-float'}`}
          />
        </motion.div>

        {/* Texto Principal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block">Essa porra não é curso.</span>
            <span className="block text-red-500">É sobrevivência digital.</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-4">
            Pra quem tá devendo,
          </p>
          
          <motion.p
            key={palavraAtual}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-3xl md:text-4xl font-bold text-red-500 mb-4"
          >
            {palavras[palavraAtual]}
          </motion.p>
          
          <p className="text-xl md:text-2xl">
            e ainda quer ganhar dinheiro no próprio caos.
          </p>
        </motion.div>

        {/* Botões */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <Link href="/acesso">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-red-600 transition-colors"
            >
              ENTRAR
            </motion.button>
          </Link>
          
          <Link href="/invites">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-red-500 text-red-500 px-8 py-4 rounded-lg text-xl font-bold hover:bg-red-500/10 transition-colors"
            >
              TENHO CONVITE
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
