'use client';

import HelioCheckoutComponent from '@/components/HelioCheckout';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function CheckoutPage() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);

  const handleStay = () => {
    setShowExitPopup(false);
  };

  const handleLeave = () => {
    setShowExitPopup(false);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Acesso ao Bunker</h1>
          <p className="text-gray-400 mb-8">Complete o pagamento para obter acesso ao Bunker</p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-lg text-center text-gray-200 leading-snug">
              Essa é a linha que separa os <span className="text-red-500 font-semibold">alimentados por promessas...</span><br />
              dos que <span className="text-white font-bold uppercase tracking-wide">forjam a própria arma</span>.
            </p>
            <p className="text-gray-400 mt-4">
              Depois do pagamento, não existe mais volta.
            </p>
          </div>

          <Link 
            href="/ritual" 
            className="text-sm underline mt-4 block text-zinc-400 hover:text-white transition-colors"
          >
            Ler os termos do Ritual
          </Link>
        </motion.div>

        <div className="space-y-4">
          {/* OpenPix Payment */}
          <Link
            href="https://openpix.com.br/pay/0eb71848-f8df-49e0-9fc6-557ce7c039b6"
            className="block w-full px-6 py-4 bg-black border-2 border-green-500 text-green-400 font-bold rounded-lg shadow-md text-lg tracking-widest overflow-hidden group hover:scale-105 transition-all duration-300 text-center"
          >
            <span className="relative z-10">PAGAR COM PIX</span>
            <span className="absolute inset-0 bg-green-500 opacity-10 blur-lg group-hover:opacity-20 transition-opacity duration-300" />
            <span className="absolute inset-0 border border-green-500 animate-pulse opacity-30 rounded-lg pointer-events-none" />
          </Link>

          {/* Hel.io Payment */}
          <Link
            href="https://hel.io/flowreborn"
            className="block w-full px-6 py-4 bg-black border-2 border-blue-500 text-blue-400 font-bold rounded-lg shadow-md text-lg tracking-widest overflow-hidden group hover:scale-105 transition-all duration-300 text-center"
          >
            <span className="relative z-10">PAGAR COM CARTÃO</span>
            <span className="absolute inset-0 bg-blue-500 opacity-10 blur-lg group-hover:opacity-20 transition-opacity duration-300" />
            <span className="absolute inset-0 border border-blue-500 animate-pulse opacity-30 rounded-lg pointer-events-none" />
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <HelioCheckoutComponent
              onSuccess={payment => {
                console.log('Pagamento confirmado:', payment);
              }}
            />
          </div>
          
          <p className="text-sm text-zinc-400 mt-6">
            💡 A cada mês, novas armas.
          </p>

          <Link 
            href="/"
            className="text-sm text-zinc-600 hover:text-zinc-400 underline mt-6 transition-colors"
          >
            ← Ainda não está pronto? Volte para a superfície.
          </Link>
        </div>
      </div>

      <ExitIntentPopup onClose={handleLeave} onStay={handleStay} />
    </div>
  );
}
