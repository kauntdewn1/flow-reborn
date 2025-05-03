'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['falido', 'fudido'];

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
          scale: [1, 1.02, 1],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Face com efeito de flutuação e opacidade */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] md:w-[35vw] max-w-[220px] md:max-w-[300px] pointer-events-none z-10"
        animate={{
          y: [0, 5, 10, 5, 0],
          opacity: [0.15, 0.22, 0.3, 0.22, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Image
          src="https://res.cloudinary.com/dgyocpguk/image/upload/v1745630513/netto_binv6m.png"
          alt="Mellø Face"
          width={300}
          height={300}
          className="w-full h-auto"
        />
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-[70vw] md:w-[50vw] max-w-[300px] md:max-w-[400px] mb-8"
      >
        <Image
          src="https://res.cloudinary.com/dgyocpguk/image/upload/v1745710570/logo_hero_fik9k6.png"
          alt="FLOW//REBORN"
          width={400}
          height={200}
          className="w-full h-auto"
          priority
        />
      </motion.div>

      {/* Botão CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative z-20"
      >
        <Link
          href="/checkout"
          className="inline-flex items-center px-8 py-3 text-lg font-medium text-black bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          ENTRAR
        </Link>
      </motion.div>

      {/* Texto com palavras alternadas */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-20 text-white text-lg md:text-xl mt-8 text-center leading-relaxed max-w-[420px] md:max-w-[600px]"
      >
        Essa porra não é curso.
        <br />
        É sobrevivência digital.
        <br />
        É um sistema de guerra
        <br />
        pra quem tá devendo,{' '}
        <span
          className="inline-block font-bold text-[#ff0033] transition-opacity duration-500"
          style={{
            opacity: wordIndex === 0 ? 1 : 0,
            position: wordIndex === 0 ? 'static' : 'absolute',
          }}
        >
          falido
        </span>
        <span
          className="inline-block font-bold text-[#ff0033] transition-opacity duration-500"
          style={{
            opacity: wordIndex === 1 ? 1 : 0,
            position: wordIndex === 1 ? 'static' : 'absolute',
          }}
        >
          fudido
        </span>
        ,<br />
        e ainda quer fazer dinheiro
        <br />
        durante seu próprio caos.
      </motion.p>
    </section>
  );
}
