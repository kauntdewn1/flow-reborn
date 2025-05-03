'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function AccessContent() {
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
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-8">Verificação de Acesso</h1>
          
          <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Status do Acesso</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                <span className="text-gray-300">Status do Pagamento:</span>
                <span className="text-green-500 font-medium">✅ Confirmado</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                <span className="text-gray-300">Acesso ao Bunker:</span>
                <span className="text-green-500 font-medium">✅ Ativo</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                <span className="text-gray-300">Bot do Telegram:</span>
                <a 
                  href="https://t.me/FlowRebornBot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  @FlowRebornBot
                </a>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-gray-400">
                Seu acesso está ativo. Use o bot do Telegram para entrar no Bunker.
              </p>
              
              <Link 
                href="/"
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Voltar para a Base
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AccessPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AccessContent />
    </Suspense>
  );
}
