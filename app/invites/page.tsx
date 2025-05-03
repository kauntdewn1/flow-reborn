'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Invites() {
  const [formData, setFormData] = useState({
    email: '',
    codinome: '',
    whatsapp: '',
    codigo: '',
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('interessados').insert([
        {
          email: formData.email.toLowerCase(),
          codinome: formData.codinome,
          whatsapp: formData.whatsapp,
          codigo_invite: formData.codigo || null,
          status: 'pendente',
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast.success('Sinal recebido. Aguarde contato.');
      setFormData({ email: '', codinome: '', whatsapp: '', codigo: '' });
    } catch (error) {
      console.error(error);
      toast.error('Erro ao enviar sinal');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono">
      {/* Efeito de Glitch */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-[2px] animate-scan" />
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {/* Header Ritualístico */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">FASE DE INFILTRAÇÃO CONTROLADA</h1>
          <p className="text-xl opacity-75 mb-8">
            &quot;Somente os quebrados merecem reconstruir.&quot;
          </p>
          <div className="w-32 h-1 bg-green-500 mx-auto" />
        </motion.div>

        {/* Texto de Introdução */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none mb-12"
        >
          <p className="text-lg mb-4">Ainda não é sua hora.</p>
          <p className="text-lg mb-4">Mas talvez... se alguém do Bunker te notar, você entre.</p>
          <p className="text-lg mb-4">
            Deixe seu e-mail e um codinome. Se tiver um convite, prove.
          </p>
          <p className="text-lg font-bold">A próxima seleção pode ser agora.</p>
        </motion.div>

        {/* Formulário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 p-8 rounded-lg border border-green-500"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black border border-green-500 p-3 rounded focus:outline-none focus:border-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Codinome</label>
              <input
                type="text"
                value={formData.codinome}
                onChange={e => setFormData({ ...formData, codinome: e.target.value })}
                className="w-full bg-black border border-green-500 p-3 rounded focus:outline-none focus:border-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">WhatsApp</label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-black border border-green-500 p-3 rounded focus:outline-none focus:border-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Código de Convite (opcional)</label>
              <input
                type="text"
                value={formData.codigo}
                onChange={e => setFormData({ ...formData, codigo: e.target.value })}
                className="w-full bg-black border border-green-500 p-3 rounded focus:outline-none focus:border-green-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-500 text-black p-4 rounded font-bold text-lg transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
              }`}
            >
              {loading ? 'ENVIANDO SINAL...' : 'QUERO ENTRAR PRO BUNKER'}
            </button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-sm opacity-75"
        >
          <p>⚠️ Acesso restrito. Apenas selecionados serão contatados.</p>
        </motion.div>
      </div>
    </div>
  );
}
