'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MentoriaPage() {
  const [loading, setLoading] = useState(false);

  const handleCTA = async () => {
    setLoading(true);
    try {
      // Aqui você pode adicionar lógica de tracking ou redirecionamento
      window.location.href = 'https://t.me/FlowRebornBot';
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background com Efeito */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-[2px] animate-scan" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Intro Impactante */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="block text-red-500">MENTORIA DE COMBATE</span>
            <span className="block text-2xl md:text-3xl mt-4 text-zinc-400">
              Não é barato. Não é pra qualquer um.
            </span>
            <span className="block text-xl md:text-2xl mt-2 text-zinc-500">
              Mas é pra quem precisa.
            </span>
          </h1>
        </motion.section>

        {/* Benefícios */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20"
        >
          <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors">
            <h3 className="text-2xl font-bold text-red-500 mb-4">Acesso Direto</h3>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="text-red-500">→</span>
                Contato 1:1 com o MELLØ
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">→</span>
                Chamadas semanais
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">→</span>
                Suporte prioritário
              </li>
            </ul>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors">
            <h3 className="text-2xl font-bold text-red-500 mb-4">Plano de Guerra</h3>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="text-red-500">→</span>
                Estratégia personalizada
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">→</span>
                Ajuste de dívidas
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">→</span>
                Metas de curto prazo
              </li>
            </ul>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors">
            <h3 className="text-2xl font-bold text-red-500 mb-4">Trilha Personalizada</h3>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="text-red-500">→</span>
                Nível: Iniciante
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">→</span>
                Nível: Fudido
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">→</span>
                Nível: Expansão
              </li>
            </ul>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors">
            <h3 className="text-2xl font-bold text-red-500 mb-4">Nada de Enrolação</h3>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="text-red-500">→</span>
                Sem fórmulas mágicas
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">→</span>
                Sem e-books
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">→</span>
                Apenas o necessário
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Testemunhos */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">ALGUNS QUE ENTRARAM NO FRONT</h2>

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

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={handleCTA}
            disabled={loading}
            className={`bg-red-500 text-white px-12 py-4 rounded-lg text-xl font-bold tracking-wider transition-all ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600 hover:scale-105'
            }`}
          >
            {loading ? 'PROCESSANDO...' : 'PASSAR PELA TRIAGEM'}
          </button>

          <p className="text-zinc-500 text-sm mt-4">
            *Apenas quem for aprovado terá acesso à mentoria.
          </p>
        </motion.section>
      </div>
    </div>
  );
}
