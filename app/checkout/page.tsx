"use client";

import HelioCheckoutComponent from "@/components/HelioCheckout";
import { motion } from "framer-motion";

export default function CheckoutPage() {
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
          <p className="text-gray-400">
            Complete o pagamento para obter acesso ao Bunker
          </p>
        </motion.div>

        <HelioCheckoutComponent
          onSuccess={(payment) => {
            console.log("Pagamento confirmado:", payment);
          }}
        />
      </div>
    </div>
  );
} 