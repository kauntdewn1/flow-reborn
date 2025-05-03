'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UpsellPage() {
  const router = useRouter();

  const verificarAcesso = async () => {
    // sua lógica aqui
  };

  useEffect(() => {
    verificarAcesso();
  }, [verificarAcesso]);

  return (
    <div>
      {/* seu conteúdo aqui */}
    </div>
  );
}
