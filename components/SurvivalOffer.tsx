'use client';

import { motion } from 'framer-motion';

export default function SurvivalOffer() {
  return (
    <section className="relative px-6 py-16 bg-black text-white z-10 overflow-hidden">
      {/* Background com efeito de glitch */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Linhas de glitch */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-[2px] animate-glitch" style={{ top: '20%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-[2px] animate-glitch" style={{ top: '40%', animationDelay: '0.5s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-[2px] animate-glitch" style={{ top: '60%', animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-[2px] animate-glitch" style={{ top: '80%', animationDelay: '1.5s' }} />
      </div>

      {/* Blackhat Vultos de Missões */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none animate-pulse-slow text-left px-8 leading-loose text-zinc-600 text-xs tracking-widest">
        <p>// Missão 5: injetar IA no backend</p>
        <p>// Desbloqueio: camuflar origem do lead</p>
        <p>// Protocolo: usar estrutura em sombra</p>
        <p>// Comando: deploy + n8n + webhook externo</p>
      </div>

      <div className="relative max-w-5xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-red-600 glitch"
        >
          Você não está comprando curso. <br /> Está se armando para guerra diária.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-zinc-300"
        >
          O QUE VOCÊ TERÁ ACESSO AO ACESSAR O BUNKER $$$:
        </motion.p>
      </div>

      {/* Bunker destaque */}
      <div className="max-w-4xl mx-auto bg-zinc-900 border border-red-600 rounded-xl shadow-xl p-6 md:p-10 mb-14 relative z-10">
        <div className="absolute top-3 right-3 text-sm bg-red-700 px-3 py-1 rounded-full font-bold text-white animate-pulse">
          NÚCLEO
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-red-400">🔐 Acesso ao Bunker $$$</h3>
        <p className="text-lg text-white/80">
          É ali que tudo começa. Terminal privado com instruções cifradas. <br />
          Só entra quem hackeia. Com área de membros e perfil de usuário.
        </p>
        <p className="mt-4 text-sm text-zinc-400 italic">
          Entrega: Link + protocolo de acesso após pagamento.
        </p>
      </div>

      {/* Cards desbloqueáveis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
        {/* Templates */}
        <div className="relative bg-zinc-800 border border-zinc-700 rounded-lg p-6 opacity-40 hover:opacity-100 transition duration-300 group">
          <div className="absolute top-2 right-2 text-xs bg-zinc-700 px-2 py-1 rounded-full text-white">
            Desbloqueio: após Missão 1
          </div>
          <h4 className="text-xl font-semibold text-white/90 mb-2">🧨 Templates de Guerra</h4>
          <p className="text-sm text-white/70">Funis agressivos com escassez e conversão em estado bruto.</p>
          <p className="mt-3 text-xs text-zinc-500 italic">Entrega: ZIP após acesso ao painel</p>
        </div>

        {/* IA Pornô */}
        <div className="relative bg-zinc-800 border border-zinc-700 rounded-lg p-6 opacity-40 hover:opacity-100 transition duration-300 group">
          <div className="absolute top-2 right-2 text-xs bg-zinc-700 px-2 py-1 rounded-full text-white">
            Desbloqueio: Missão 3
          </div>
          <h4 className="text-xl font-semibold text-white/90 mb-2">🧠 IA Pornô</h4>
          <p className="text-sm text-white/70">Chat de IA treinado com fetiches + n8n pra automatizar leads e vendas.</p>
          <p className="mt-3 text-xs text-zinc-500 italic">Entrega: Tutorial + repo privado no Vault</p>
        </div>

        {/* Missão Secreta */}
        <div className="relative bg-zinc-800 border border-zinc-700 rounded-lg p-6 opacity-40 hover:opacity-100 transition duration-300 group">
          <div className="absolute top-2 right-2 text-xs bg-zinc-700 px-2 py-1 rounded-full text-white">
            Desbloqueio: Missão 5+
          </div>
          <h4 className="text-xl font-semibold text-white/90 mb-2">🎯 Missão Secreta</h4>
          <p className="text-sm text-white/70">Blackhat digital com sistema de avanço gamificado.<br />Cada resultado libera a próxima missão.</p>
          <p className="mt-3 text-xs text-zinc-500 italic">Entrega: no painel + gatilho do bot</p>
        </div>
      </div>
    </section>
  );
}
