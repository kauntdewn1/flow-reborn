'use client'

import { motion } from 'framer-motion'

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
            <a 
              href="https://app.hel.io/pay/68115cb08aced19aace0fcf2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
                ENTRAR E RECONHECER O CAOS
              </button>
            </a>
          </motion.div>
          
          <p className="mt-6 text-zinc-500 text-sm">
            Acesso vitalício • Suporte 24/7 • Atualizações constantes
          </p>
        </motion.div>
      </div>
    </section>
  )
} 