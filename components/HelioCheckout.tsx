'use client';

import { HelioCheckout } from '@heliofi/checkout-react';
import { useState } from 'react';

interface HelioCheckoutComponentProps {
  onSuccess?: (payment: any) => void;
}

interface HelioError {
  transaction?: string;
  errorMessage?: string;
}

export default function HelioCheckoutComponent({ onSuccess }: HelioCheckoutComponentProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = (payment: any) => {
    setShowSuccess(true);
    onSuccess?.(payment);
  };

  if (showSuccess) {
    return (
      <div className="text-center p-8 bg-zinc-900 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">🎯 Pagamento recebido</h2>
        <p className="text-gray-300 mb-6">Agora começa seu treinamento.</p>
        <p className="text-gray-300 mb-4">O acesso ao Bunker será liberado pelo Bot:</p>
        <a 
          href="https://t.me/FlowRebornBot" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 text-lg font-medium"
        >
          👉 @FlowRebornBot
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <HelioCheckout
        config={{
          paylinkId: '68115cb08aced19aace0fcf2',
          theme: { themeMode: 'dark' },
          primaryColor: '#8DCD2D',
          neutralColor: '#E1E6EC',
          display: 'inline',
          onSuccess: handleSuccess,
          onError: (error: HelioError) => console.error('Erro no pagamento:', error.errorMessage),
          onPending: () => console.log('Pagamento pendente'),
          onCancel: () => console.log('Pagamento cancelado'),
          onStartPayment: () => console.log('Iniciando pagamento'),
        }}
      />
    </div>
  );
}
