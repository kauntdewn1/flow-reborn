'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function AccessContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div>
      {/* Seu conteúdo aqui */}
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