'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface User {
  id: string;
  codinome: string;
  nome: string;
  email: string;
  nivel: number;
  pontos: number;
  xp_atual: number;
  xp_proximo_nivel: number;
  acesso_bunker: boolean;
  conquistas: string[];
  created_at: string;
  ultimo_acesso: string;
  telegram_id?: string;
  two_factor_enabled: boolean;
  ranking_posicao: number;
  ranking_variacao: number;
  avatar_url?: string;
}

interface Desafio {
  id: string;
  titulo: string;
  descricao: string;
  xp_recompensa: number;
  concluido: boolean;
  data_conclusao?: string;
}

interface Recompensa {
  id: string;
  tipo: 'conteudo' | 'badge' | 'ponto';
  titulo: string;
  descricao: string;
  data_obtencao: string;
}

const niveis = ['Recruta', 'Soldado', 'Executor', 'Fantasma', 'Mestre', 'Lenda'];

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [desafios, setDesafios] = useState<Desafio[]>([]);
  const [recompensas, setRecompensas] = useState<Recompensa[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    codinome: '',
    telegram_id: '',
    two_factor_enabled: false,
  });

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error('Sessão expirada');
        return;
      }

      const [userRes, desafiosRes, recompensasRes] = await Promise.all([
        supabase.from('users').select('*').eq('id', session.user.id).single(),
        supabase
          .from('desafios')
          .select('*')
          .eq('user_id', session.user.id)
          .order('data_conclusao', { ascending: false }),
        supabase
          .from('recompensas')
          .select('*')
          .eq('user_id', session.user.id)
          .order('data_obtencao', { ascending: false }),
      ]);

      if (userRes.error) throw userRes.error;
      if (desafiosRes.error) throw desafiosRes.error;
      if (recompensasRes.error) throw recompensasRes.error;

      setUser(userRes.data);
      setDesafios(desafiosRes.data || []);
      setRecompensas(recompensasRes.data || []);
      setFormData({
        codinome: userRes.data.codinome,
        telegram_id: userRes.data.telegram_id || '',
        two_factor_enabled: userRes.data.two_factor_enabled,
      });
    } catch (error) {
      toast.error('Erro ao carregar dados');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function atualizarPerfil() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Sessão expirada');

      const { error } = await supabase
        .from('users')
        .update({
          codinome: formData.codinome,
          telegram_id: formData.telegram_id,
          two_factor_enabled: formData.two_factor_enabled,
        })
        .eq('id', session.user.id);

      if (error) throw error;

      toast.success('Perfil atualizado com sucesso');
      setEditando(false);
      carregarDados();
    } catch (error) {
      toast.error('Erro ao atualizar perfil');
      console.error(error);
    }
  }

  async function solicitarRemocaoDados() {
    if (
      !confirm(
        'Tem certeza que deseja solicitar a remoção de seus dados? Esta ação não pode ser desfeita.'
      )
    ) {
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Sessão expirada');

      const { error } = await supabase.from('solicitacoes_remocao').insert({
        user_id: session.user.id,
        status: 'pendente',
      });

      if (error) throw error;

      toast.success('Solicitação enviada com sucesso');
    } catch (error) {
      toast.error('Erro ao enviar solicitação');
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-green-500 font-mono">
        <div className="animate-pulse">CARREGANDO FICHA...</div>
      </div>
    );
  }

  if (!user) return null;

  const xpPorcentagem = (user.xp_atual / user.xp_proximo_nivel) * 100;
  const nivelAtual = niveis[Math.min(user.nivel, niveis.length - 1)];

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-green-500 pb-4 mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">FICHA DO SOLDADO</h1>
            <p className="text-sm opacity-75">
              Último acesso: {new Date(user.ultimo_acesso).toLocaleString()}
            </p>
          </div>
          <div className="relative w-20 h-20">
            <Image
              src={user.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${user.id}`}
              alt="Avatar"
              fill
              className="rounded-full border-2 border-green-500"
            />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status e Nível */}
        <section className="bg-gray-900 p-6 rounded border border-green-500">
          <h2 className="text-2xl font-bold mb-4">STATUS</h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm opacity-75">Nível</p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-green-500"
                >
                  {nivelAtual}
                </motion.div>
              </div>

              <div className="relative h-4 bg-black rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPorcentagem}%` }}
                  className="absolute h-full bg-green-500"
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs">
                  {user.xp_atual}/{user.xp_proximo_nivel} XP
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-75">Pontos</p>
                <p className="text-2xl font-bold">{user.pontos}</p>
              </div>

              <div>
                <p className="text-sm opacity-75">Acesso ao Bunker</p>
                <motion.div animate={{ rotate: user.acesso_bunker ? 0 : 45 }} className="text-2xl">
                  {user.acesso_bunker ? '🔓' : '🔒'}
                </motion.div>
              </div>

              <div>
                <p className="text-sm opacity-75">Ranking</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">#{user.ranking_posicao}</p>
                  {user.ranking_variacao > 0 && <span className="text-green-500">↑</span>}
                  {user.ranking_variacao < 0 && <span className="text-red-500">↓</span>}
                </div>
              </div>

              <div>
                <p className="text-sm opacity-75">Membro Desde</p>
                <p className="text-2xl font-bold">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Desafios Atuais */}
        <section className="bg-gray-900 p-6 rounded border border-green-500">
          <h2 className="text-2xl font-bold mb-4">MISSÃO ATUAL</h2>

          <div className="space-y-4">
            {desafios
              .filter(d => !d.concluido)
              .map(desafio => (
                <motion.div
                  key={desafio.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-black p-4 rounded border border-green-500"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={desafio.concluido}
                      onChange={() => {
                        /* Implementar conclusão */
                      }}
                      className="w-5 h-5 border-green-500 rounded"
                    />
                    <div>
                      <p className="font-bold">{desafio.titulo}</p>
                      <p className="text-sm opacity-75">{desafio.descricao}</p>
                      <p className="text-xs text-green-500 mt-1">+{desafio.xp_recompensa} XP</p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </section>

        {/* Recompensas */}
        <section className="bg-gray-900 p-6 rounded border border-green-500">
          <h2 className="text-2xl font-bold mb-4">RECOMPENSAS</h2>

          <div className="grid grid-cols-2 gap-4">
            {recompensas.map(recompensa => (
              <motion.div
                key={recompensa.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black p-4 rounded border border-green-500"
              >
                <p className="font-bold">{recompensa.titulo}</p>
                <p className="text-sm opacity-75">{recompensa.descricao}</p>
                <p className="text-xs text-green-500 mt-1">
                  {new Date(recompensa.data_obtencao).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Configurações */}
        <section className="bg-gray-900 p-6 rounded border border-green-500">
          <h2 className="text-2xl font-bold mb-4">CONFIGURAÇÕES</h2>

          {editando ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Codinome</label>
                <input
                  type="text"
                  value={formData.codinome}
                  onChange={e => setFormData({ ...formData, codinome: e.target.value })}
                  className="w-full bg-black border border-green-500 p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">ID do Telegram</label>
                <input
                  type="text"
                  value={formData.telegram_id}
                  onChange={e => setFormData({ ...formData, telegram_id: e.target.value })}
                  className="w-full bg-black border border-green-500 p-2 rounded"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.two_factor_enabled}
                  onChange={e => setFormData({ ...formData, two_factor_enabled: e.target.checked })}
                  className="w-4 h-4 border-green-500 rounded"
                />
                <label className="text-sm">Ativar 2FA</label>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={atualizarPerfil}
                  className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  SALVAR
                </button>
                <button
                  onClick={() => setEditando(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  CANCELAR
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm opacity-75">Codinome</p>
                <p className="text-lg">{user.codinome}</p>
              </div>

              <div>
                <p className="text-sm opacity-75">Telegram</p>
                <p className="text-lg">{user.telegram_id || 'Não conectado'}</p>
              </div>

              <div>
                <p className="text-sm opacity-75">2FA</p>
                <p className="text-lg">{user.two_factor_enabled ? 'Ativado' : 'Desativado'}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setEditando(true)}
                  className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  EDITAR
                </button>
                <button
                  onClick={solicitarRemocaoDados}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  SOLICITAR REMOÇÃO
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
