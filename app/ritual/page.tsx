'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RitualPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">📜 Antes de Entrar no Bunker</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. O que você vai receber:</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Acesso ao Bunker (área de membros cifrada)</li>
                <li>Missões mensais com templates de sobrevivência digital</li>
                <li>Hacks de marketing sem firula, direto ao ponto</li>
                <li>Atualizações insanas e conteúdo sujo com IA</li>
                <li>Um bot exclusivo que vai te guiar: <a href="https://t.me/FlowRebornBot" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">@FlowRebornBot</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Essa é uma assinatura mensal:</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Valor: 12 USDC/mês</li>
                <li>Você pode pagar com wallet, cartão ou tokens</li>
                <li>Todo mês você recebe um novo ritual de guerra</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Política de reembolso:</h2>
              <div className="space-y-2 text-gray-300">
                <p>Não existe reembolso.</p>
                <p>Existe compromisso.</p>
                <p>Existe renascimento.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Condições:</h2>
              <p className="text-gray-300 mb-4">Ao confirmar, você:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Aceita fazer parte de um treinamento sem volta</li>
                <li>Entende que essa plataforma não é sobre conforto — é sobre evolução forçada</li>
                <li>Concorda em ser responsabilizado pelo seu próprio progresso</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/checkout"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Voltar para o Checkout
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 