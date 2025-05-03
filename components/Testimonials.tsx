'use client';

import { motion } from 'framer-motion';

export default function Testimonials() {
  return (
    <section className="py-16 bg-black text-white text-center px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-red-500 mb-6"
      >
        🎖️ QUADRO DE HONRA
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto mb-12"
      >
        Os primeiros 3 recrutas que concluírem a Missão 2 e enviarem seu relato real  
        desbloqueiam um <span className="text-red-500 font-semibold">acesso cifrado ao Bunker Avançado</span>.  
        Nome codificado. Registro fixado. E um lugar garantido na história.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[1, 2, 3].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.2 }}
            className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl"
          >
            <h3 className="text-red-600 font-bold mb-1">⛓ Slot Desbloqueável</h3>
            <p className="text-sm text-white/70">
              {index === 0 && "A vaga tá aberta. Conclua a Missão Zero e envie sua prova."}
              {index === 1 && "O sistema vai registrar o nome dos bravos. Só os 3 primeiros entram nessa parede."}
              {index === 2 && "Registro imutável. Recompensa oculta. Sobe quem age. Desaparece quem hesita."}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-10 text-sm text-zinc-400 italic"
      >
        ⚠️ As vagas são únicas. Quando as 3 forem ocupadas, a parede se fecha.
      </motion.p>
    </section>
  );
}
