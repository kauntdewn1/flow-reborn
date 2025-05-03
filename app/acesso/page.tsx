'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Acesso() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  async function verificarAcesso(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      // Verifica se o email está autorizado
      const { data: user, error } = await supabase
        .from('users')
        .select('id, email, acesso_bunker')
        .eq('email', email.toLowerCase())
        .single();

      if (error || !user) {
        toast.error('Email não autorizado');
        return;
      }

      if (!user.acesso_bunker) {
        toast.error('Acesso ao bunker não liberado');
        return;
      }

      // Gera um link mágico para login
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: email.toLowerCase(),
        options: {
          emailRedirectTo: `${window.location.origin}${redirectTo}`,
        },
      });

      if (signInError) throw signInError;

      toast.success('Link de acesso enviado para seu email');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao verificar acesso');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-900 p-8 rounded-lg border border-green-500">
          <h1 className="text-3xl font-bold mb-6 text-center">ACESSO RESTRITO</h1>

          <form onSubmit={verificarAcesso} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Email Autorizado</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-black border border-green-500 p-3 rounded focus:outline-none focus:border-green-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-500 text-black p-3 rounded font-bold transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
              }`}
            >
              {loading ? 'VERIFICANDO...' : 'SOLICITAR ACESSO'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm opacity-75">
            <p>⚠️ Acesso restrito apenas para membros autorizados</p>
            <p className="mt-2">Entre em contato com o administrador para solicitar acesso</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
