'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['FALIDØ', 'FUDIDØ'];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(prev => (prev + 1) % words.length);
    }, 1600);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-4 py-16 md:py-24">
      {/* Background com efeito de flutuação */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center brightness-30"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/dgyocpguk/image/upload/v1745630512/1_hbyge2.png")',
          filter: 'brightness(0.3)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          y: [0, -15, 0],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Face com efeito de flutuação e opacidade */}
      <motion.div
        className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[65vw] md:w-[45vw] max-w-[280px] md:max-w-[400px] pointer-events-none z-10"
        animate={{
          y: [0, 15, 25, 15, 0],
          x: [-8, 8, 15, 8, -8],
          opacity: [0.15, 0.25, 0.35, 0.25, 0.15],
          rotate: [-2, 3, 8, 3, -2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Image
          src="https://res.cloudinary.com/dgyocpguk/image/upload/v1745630513/netto_binv6m.png"
          alt="Mellø Face"
          width={400}
          height={400}
          className="w-full h-auto"
        />
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-[80vw] md:w-[60vw] max-w-[350px] md:max-w-[500px] mb-12"
      >
        <Image
          src="https://res.cloudinary.com/dgyocpguk/image/upload/v1745710570/logo_hero_fik9k6.png"
          alt="FLOW//REBORN"
          width={500}
          height={250}
          className="w-full h-auto"
          priority
        />
      </motion.div>

      {/* Botão CTA */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0.9 }}
        animate={{ scale: [0.95, 1, 0.95], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative z-20"
      >
        <Link
          href="/entrada-secreta"
          className="group relative inline-block px-10 py-5 bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white rounded-xl shadow-[0_0_20px_rgba(255,0,0,0.4)] overflow-hidden transition-all duration-300 hover:shadow-red-500/60 hover:scale-105 text-lg md:text-xl tracking-widest font-extrabold border-2 border-red-900"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
          ⛓ DESBLOQUEAR O BUNKER $$$ 
          </span>

          {/* Glow pulsante */}
          <div className="absolute inset-0 bg-red-600 opacity-10 group-hover:opacity-20 animate-pulse" />
          
          {/* Borda animada (ping) */}
          <div className="absolute inset-0 border-2 border-red-500 opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDelay: '0.4s' }} />

          {/* Efeito glitch (opcional) */}
          <div className="absolute -top-1 -left-1 w-full h-full bg-red-900 opacity-0 group-hover:opacity-20 mix-blend-screen blur-sm animate-pulse" />
        </Link>
      </motion.div>

      {/* Texto com palavras alternadas */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-20 text-white text-lg md:text-2xl mt-12 text-center leading-relaxed max-w-[420px] md:max-w-[800px]"
      >
        <motion.div
          animate={{
            opacity: [0.7, 0.9, 0.7],
            scale: [0.98, 1, 0.98],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-lg md:text-2xl font-bold text-white/90"
        >
          Não é um curso.
          <br />
          É um sistema de sobrevivência pra quem está
        </motion.div>
        <span className="block min-h-[3em] relative flex items-center justify-center my-4">
          <span
            className="inline-block font-bold text-[#ff0033] transition-opacity duration-500 relative text-2xl md:text-4xl"
            style={{
              opacity: wordIndex === 0 ? 1 : 0,
              position: wordIndex === 0 ? 'static' : 'absolute',
            }}
          >
            <span className="absolute inset-0 blur-[2px] opacity-50">{words[0]}</span>
            <span className="relative">{words[0]}</span>
            <span className="absolute inset-0 blur-[4px] opacity-30 -translate-x-1">{words[0]}</span>
            <span className="absolute inset-0 blur-[4px] opacity-30 translate-x-1">{words[0]}</span>
          </span>
          <span
            className="inline-block font-bold text-[#ff0033] transition-opacity duration-500 relative text-2xl md:text-4xl"
            style={{
              opacity: wordIndex === 1 ? 1 : 0,
              position: wordIndex === 1 ? 'static' : 'absolute',
            }}
          >
            <span className="absolute inset-0 blur-[2px] opacity-50">{words[1]}</span>
            <span className="relative">{words[1]}</span>
            <span className="absolute inset-0 blur-[4px] opacity-30 -translate-x-1">{words[1]}</span>
            <span className="absolute inset-0 blur-[4px] opacity-30 translate-x-1">{words[1]}</span>
          </span>
        </span>
        <motion.div
          animate={{
            opacity: [0.7, 0.9, 0.7],
            scale: [0.98, 1, 0.98],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="text-lg md:text-2xl font-bold text-white/90 mt-4"
        >
          Mas vai fazer dinheiro
          <br />
          durante seu próprio caos.
        </motion.div>
      </motion.p>
    </section>
  );
}
