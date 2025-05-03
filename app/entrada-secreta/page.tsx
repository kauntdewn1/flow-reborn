'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EntradaSecretaPage() {
  const [loading, setLoading] = useState(false);

  const handleCTA = () => {
    setLoading(true);
    window.location.href = 'https://tally.so/r/nPgj4x';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background com Efeito */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-[2px] animate-scan" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="block text-red-500">TREINAMENTO TÁTICO INTENSIVO</span>
              <span className="block text-2xl md:text-3xl mt-4 text-zinc-400">
                Não é ajuda. É comando. Só entra quem aguenta ordem sem choro.
              </span>
            </h1>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm border border-red-500/20 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center text-red-500">⚔️</h2>
            <p className="text-xl text-gray-300 text-center italic">
              "Essa não é a mentoria que te segura pela mão.<br />
              É o treinamento que te joga no meio da selva — com uma faca e um plano."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors">
              <h3 className="text-2xl font-bold text-red-500 mb-4">Acesso Direto</h3>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Canal Criptografado com o General
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Linha direta com MELLØ
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Chamadas estratégicas semanais
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Resposta prioritária. Sem frescura.
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors">
              <h3 className="text-2xl font-bold text-red-500 mb-4">Plano de Guerra</h3>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Missões Táticas Personalizadas
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Diagnóstico tático de dívidas
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Estratégia baseada na tua real condição
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Metas de curto prazo pra gerar caixa
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors">
              <h3 className="text-2xl font-bold text-red-500 mb-4">Trilha Personalizada</h3>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Rota de Sobrevivência
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Classificação inicial: Fudido, Iniciante ou Expansão
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  A cada estágio: um novo protocolo
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Não existe diploma. Só evolução real
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors">
              <h3 className="text-2xl font-bold text-red-500 mb-4">Nada de Enrolação</h3>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Sem Fórmulas. Só Armas
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Sem e-books de autoajuda
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">→</span>
                  Sem mágica. Só movimento.
                </li>
              </ul>
            </div>
          </div>

          {/* Testemunhos */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-red-500">ALGUNS QUE ENTRARAM NO FRONT</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-zinc-900/30 p-6 rounded-lg border border-red-500/20">
                <p className="text-zinc-300 italic mb-4">
                  &ldquo;Fiz mais em 30 dias do que nos últimos 2 anos. MELLØ não tem papas na língua,
                  mas é exatamente o que eu precisava.&rdquo;
                </p>
                <p className="text-sm text-zinc-500">- Soldado #42</p>
              </div>

              <div className="bg-zinc-900/30 p-6 rounded-lg border border-red-500/20">
                <p className="text-zinc-300 italic mb-4">
                  &ldquo;A dívida continua, mas agora eu sou dono do campo de batalha. Cada chamada é
                  um novo plano de ataque.&rdquo;
                </p>
                <p className="text-sm text-zinc-500">- Soldado #17</p>
              </div>
            </div>
          </motion.section>

          <div className="text-center">
            <button
              onClick={handleCTA}
              disabled={loading}
              className={`bg-red-500 text-white px-12 py-4 rounded-lg text-xl font-bold tracking-wider transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600 hover:scale-105'
              }`}
            >
              {loading ? 'PROCESSANDO...' : 'PASSAR PELA TRIAGEM'}
            </button>
            <p className="mt-4 text-zinc-500">
              💀 Apenas sobreviventes serão aprovados para esse treinamento.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 