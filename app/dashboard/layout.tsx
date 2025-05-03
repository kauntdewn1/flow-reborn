'use client';

import { useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const verificarAcesso = useCallback(async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/acesso');
        return;
      }

      // Verifica se o usuário tem acesso ao dashboard
      const { data: user, error } = await supabase
        .from('users')
        .select('acesso_bunker')
        .eq('id', session.user.id)
        .single();

      if (error || !user?.acesso_bunker) {
        router.push('/acesso');
      }
    } catch (error) {
      console.error('Erro ao verificar acesso:', error);
      router.push('/acesso');
    }
  }, [router]);

  useEffect(() => {
    verificarAcesso();
  }, [verificarAcesso]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />

      {/* Configuração do Toaster */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111',
            color: '#10B981',
            border: '1px solid #10B981',
            fontFamily: 'monospace',
          },
        }}
      />
    </div>
  );
}
