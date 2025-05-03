'use client'

import { motion } from 'framer-motion'

const gridItems = [
  {
    title: '🧨 Templates Sujos',
    description: 'Funis prontos com escassez e copy de fome. Checkouts com QR + páginas clonáveis.',
    delivery: 'Entrega: ZIP ou link direto na Área de Membros',
  },
  {
    title: '🧠 IA Pornô',
    description: 'Chat de IA com fetiches treinados + n8n para gerar leads e vender no automático.',
    delivery: 'Entrega: Tutorial + repo privado ou código no Vault',
  },
  {
    title: '🔐 Acesso ao Bunker',
    description: 'Área secreta com terminal, códigos e plano de fuga. Só entra quem hackear.',
    delivery: 'Entrega: link + instruções após pagamento',
  },
  {
    title: '🎯 Missão Secreta',
    description: 'Estratégias blackhat com desbloqueio progressivo. Missões gamificadas com resultado real.',
    delivery: 'Entrega: no painel + gatilho do bot',
  },
]

export default function SurvivalOffer() {
  return (
    <section className="relative px-6 py-16 bg-black text-white z-10">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-red-600 glitch"
        >
          Tu não tá comprando aula.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-zinc-300"
        >
          Tá pegando em arma real.<br />
          Tudo aqui foi testado no desespero.<br />
          Agora é tua vez de atirar.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {gridItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.02,
              borderColor: '#ef4444',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
            }}
            transition={{ 
              duration: 0.5, 
              delay: i * 0.2,
              type: "spring",
              stiffness: 300
            }}
            viewport={{ once: true }}
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 relative shadow-lg transition-all cursor-crosshair"
          >
            <h3 className="text-xl font-bold text-red-500 mb-2">{item.title}</h3>
            <p className="text-zinc-300 mb-3">{item.description}</p>
            <p className="text-zinc-500 text-sm italic">{item.delivery}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 