'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Efeito de scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent animate-scan" />
      
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-red-600 mb-6">
            ENTRE NO CAOS
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Não é curso. É sobrevivência digital.
            Pra quem tá devendo, falido, e ainda quer ganhar dinheiro no próprio caos.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/checkout"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-black bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              ENTRAR
            </Link>
          </motion.div>
          
          <p className="mt-6 text-zinc-500 text-sm">
            Acesso vitalício • Suporte 24/7 • Atualizações constantes
          </p>
        </motion.div>
      </div>
    </section>
  )
} 