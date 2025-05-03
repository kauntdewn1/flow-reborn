'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function UpsellPage() {
  const router = useRouter();

  const verificarAcesso = useCallback(async () => {
    // sua lógica aqui
  }, [router]);

  useEffect(() => {
    verificarAcesso();
  }, [verificarAcesso]);

  return (
    <div>
      {/* seu conteúdo aqui */}
    </div>
  );
}
