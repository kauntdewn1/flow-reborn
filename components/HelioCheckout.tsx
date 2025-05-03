"use client";

import { HelioCheckout } from "@heliofi/checkout-react";
import { useRouter } from "next/navigation";

interface HelioCheckoutProps {
  onSuccess?: (payment: any) => void;
}

export default function HelioCheckoutComponent({
  onSuccess,
}: HelioCheckoutProps) {
  const router = useRouter();

  const helioConfig = {
    paylinkId: "68115cb08aced19aace0fcf2",
    theme: { themeMode: "dark" },
    primaryColor: "#8DCD2D",
    neutralColor: "#E1E6EC",
    display: "inline",
    onSuccess: (event: any) => {
      console.log("Pagamento realizado com sucesso:", event);
      if (onSuccess) {
        onSuccess(event);
      }
      router.push("/bunker");
    },
    onError: (event: any) => {
      console.error("Erro no pagamento:", event);
    },
    onPending: (event: any) => {
      console.log("Pagamento pendente:", event);
    },
    onCancel: () => {
      console.log("Pagamento cancelado");
    },
    onStartPayment: () => {
      console.log("Iniciando pagamento");
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <HelioCheckout config={helioConfig} />
    </div>
  );
} 