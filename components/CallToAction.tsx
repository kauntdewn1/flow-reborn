'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-20 bg-black text-center px-6 text-white relative overflow-hidden">
      {/* Efeito de scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent animate-scan" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-red-600 mb-6 tracking-tight leading-tight"
      >
        ENTRE OU DESAPAREÇA. <br />
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-white/60 text-base md:text-lg block mt-3 italic hover:text-red-500 transition-all duration-300"
        >
          E não conte pra ninguém que viu esse site.
        </motion.span>
      </motion.h2>

      {/* BOTÃO TERMINAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/checkout"
          className="relative inline-block px-10 py-4 bg-black border-2 border-green-500 text-green-400 font-bold rounded-lg shadow-md text-lg tracking-widest overflow-hidden group hover:scale-105 transition-all duration-300"
        >
          <span className="relative z-10">DESBLOQUEAR O CAOS</span>
          <span
            className="absolute inset-0 bg-green-500 opacity-10 blur-lg group-hover:opacity-20 transition-opacity duration-300"
          />
          <span
            className="absolute inset-0 border border-green-500 animate-pulse opacity-30 rounded-lg pointer-events-none"
          />
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-sm text-zinc-500 italic"
      >
        Acesso vitalício • Suporte cifrado 24/7 • Atualizações nas sombras
      </motion.p>
    </section>
  );
}
