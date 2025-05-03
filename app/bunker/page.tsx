'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Modulo {
  id: string;
  titulo: string;
  descricao: string;
  desbloqueado: boolean;
  senha?: string;
}

interface Missao {
  id: string;
  titulo: string;
  descricao: string;
  prazo: string;
  tipo: 'funil' | 'blackhat';
}

export default function Bunker() {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [loading, setLoading] = useState(true);
  const [senhaModulo, setSenhaModulo] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setLoading(true);
      const [modulosRes, missoesRes] = await Promise.all([
        supabase.from('modulos').select('*'),
        supabase.from('missoes').select('*').eq('ativa', true),
      ]);

      if (modulosRes.error) throw modulosRes.error;
      if (missoesRes.error) throw missoesRes.error;

      setModulos(modulosRes.data || []);
      setMissoes(missoesRes.data || []);
    } catch (error) {
      toast.error('Erro ao carregar dados do bunker');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function tentarDesbloquearModulo(moduloId: string) {
    try {
      const modulo = modulos.find(m => m.id === moduloId);
      if (!modulo) return;

      if (senhaModulo === modulo.senha) {
        const { error } = await supabase
          .from('modulos')
          .update({ desbloqueado: true })
          .eq('id', moduloId);

        if (error) throw error;

        toast.success('Módulo desbloqueado com sucesso!');
        carregarDados();
      } else {
        toast.error('Senha incorreta');
      }
    } catch (error) {
      toast.error('Erro ao desbloquear módulo');
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-green-500 font-mono">
        <div className="animate-pulse">CARREGANDO BUNKER...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-green-500 pb-4 mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">ÁREA DE MEMBROS - BUNKER CIFRADO</h1>
        <p className="text-sm opacity-75">Último acesso: {new Date().toLocaleString()}</p>
      </motion.div>

      {/* Briefing de Guerra */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🧠 BRIEFING DE GUERRA</h2>
        <div className="bg-gray-900 p-4 rounded border border-green-500">
          <video className="w-full rounded" controls poster="/thumbnail-briefing.jpg">
            <source src="/briefing.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        </div>
      </section>

      {/* Módulos */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📂 MÓDULOS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modulos.map(modulo => (
            <motion.div
              key={modulo.id}
              className="bg-gray-900 p-4 rounded border border-green-500"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold mb-2">{modulo.titulo}</h3>
              <p className="text-sm opacity-75 mb-4">{modulo.descricao}</p>

              {!modulo.desbloqueado && (
                <div className="space-y-2">
                  <input
                    type="password"
                    value={senhaModulo}
                    onChange={e => setSenhaModulo(e.target.value)}
                    className="w-full bg-black border border-green-500 p-2 rounded"
                    placeholder="Digite a senha..."
                  />
                  <button
                    onClick={() => tentarDesbloquearModulo(modulo.id)}
                    className="w-full bg-green-500 text-black p-2 rounded hover:bg-green-600 transition-colors"
                  >
                    DESBLOQUEAR
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Códigos e Templates */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">💣 CÓDIGOS E TEMPLATES</h2>
        <div className="bg-gray-900 p-4 rounded border border-green-500">
          <pre className="whitespace-pre-wrap">
            {`# Instruções de Uso

1. Baixe os arquivos ZIP
2. Extraia em uma pasta segura
3. Siga as instruções em TXT
4. Não compartilhe com ninguém

⚠️ ATENÇÃO: Mantenha seus arquivos seguros`}
          </pre>
        </div>
      </section>

      {/* Comunicação Interna */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📡 COMUNICAÇÃO INTERNA</h2>
        <div className="bg-gray-900 p-4 rounded border border-green-500">
          <p className="mb-4">Grupo Fechado de Texto no Telegram:</p>
          <a
            href="https://t.me/+mngpA4dIKnM0YmYx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-400 underline"
          >
            https://t.me/+mngpA4dIKnM0YmYx
          </a>
          <div className="mt-4 text-sm">
            <p className="font-bold mb-2">Padrão de Nome:</p>
            <code className="block bg-black p-2 rounded mb-2">[Codinome] | [Valor da Dívida]</code>
            <p className="text-xs opacity-75">Exemplo: Sombra | 32K</p>
          </div>
        </div>
      </section>

      {/* Missão Secreta */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">👁️ MISSÃO SECRETA</h2>
        <div className="space-y-4">
          {missoes.map(missao => (
            <motion.div
              key={missao.id}
              className="bg-gray-900 p-4 rounded border border-green-500"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold mb-2">{missao.titulo}</h3>
              <p className="text-sm opacity-75 mb-2">{missao.descricao}</p>
              <p className="text-xs text-red-500">Prazo: {missao.prazo}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vault */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🧨 VAULT - CAIXA PRETA</h2>
        <div className="bg-gray-900 p-4 rounded border border-green-500">
          <p className="text-sm opacity-75">
            Área restrita para conteúdo sensível. Acesso apenas para membros verificados.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm opacity-75 mt-12">
        <p>💥 ENTROU, NÃO TEM VOLTA.</p>
        <p>Aqui ou tu vira máquina de vender... ou desliga a porra do wi-fi.</p>
      </footer>
    </div>
  );
}
