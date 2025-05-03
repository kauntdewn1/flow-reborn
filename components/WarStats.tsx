'use client'

import { motion } from 'framer-motion'

const stats = [
  { label: 'Soldados Ativos', value: '1.2k+' },
  { label: 'Missões Concluídas', value: '5.4k+' },
  { label: 'Taxa de Sobrevivência', value: '94%' },
  { label: 'Horas de Treinamento', value: '10k+' }
]

export default function WarStats() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                {stat.value}
              </div>
              <div className="text-zinc-400 text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 