'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const stats = [
  { label: 'Soldados Ativos', value: '1.2k+', scramble: true },
  { label: 'Missões Concluídas', value: '5.4k+', scramble: true },
  { label: 'Taxa de Sobrevivência', value: '94%', scramble: true },
  { label: 'Horas de Treinamento', value: '10k+', scramble: true },
];

const scrambleText = (text: string) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return text
    .split('')
    .map(char => {
      if (char === '.' || char === 'k' || char === '+' || char === '%') return char;
      return chars[Math.floor(Math.random() * chars.length)];
    })
    .join('');
};

export default function WarStats() {
  const [scrambledValues, setScrambledValues] = useState(stats.map(stat => stat.value));

  useEffect(() => {
    const interval = setInterval(() => {
      setScrambledValues(prev => 
        prev.map((value, index) => 
          stats[index].scramble ? scrambleText(value) : value
        )
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Gradiente de radiação */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
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
              <div className="relative text-3xl md:text-4xl font-bold text-red-600 mb-2 font-mono tracking-wider">
                <div className="absolute inset-0 blur-[4px] opacity-40">
                  {scrambledValues[index]}
                </div>
                <div className="relative blur-[1px] opacity-80">
                  {scrambledValues[index]}
                </div>
                <div className="absolute inset-0 blur-[8px] opacity-30 -translate-x-3">
                  {scrambledValues[index]}
                </div>
                <div className="absolute inset-0 blur-[8px] opacity-30 translate-x-3">
                  {scrambledValues[index]}
                </div>
                <div className="absolute inset-0 blur-[12px] opacity-25 -translate-x-6">
                  {scrambledValues[index]}
                </div>
                <div className="absolute inset-0 blur-[12px] opacity-25 translate-x-6">
                  {scrambledValues[index]}
                </div>
                <div className="absolute inset-0 blur-[16px] opacity-20 -translate-x-8">
                  {scrambledValues[index]}
                </div>
                <div className="absolute inset-0 blur-[16px] opacity-20 translate-x-8">
                  {scrambledValues[index]}
                </div>
              </div>
              <div className="text-zinc-400 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
