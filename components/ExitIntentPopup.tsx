'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExitIntentPopupProps {
  onClose: () => void;
  onStay: () => void;
}

export default function ExitIntentPopup({ onClose, onStay }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 max-w-md w-full text-center"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">
              A maioria desiste no portão.
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Mas os que atravessam... voltam com fogo nos olhos.
            </p>
            <p className="text-lg mb-8 text-red-500 font-medium">
              💣 Ainda quer sair? Ou vai enfrentar o que te espera no bunker?
            </p>

            <div className="space-y-4">
              <button
                onClick={onStay}
                className="w-full py-3 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
              >
                Entrar no Bunker
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 px-6 bg-transparent border border-zinc-700 text-zinc-400 rounded-md hover:bg-zinc-800 transition-colors"
              >
                Voltar depois...
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 