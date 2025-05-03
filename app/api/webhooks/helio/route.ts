import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.event === 'HELIO:PAYMENT_COMPLETED') {
      const { payment } = body;
      const correlationID = payment.correlationID;

      console.log(`💥 Pagamento recebido. Desbloquear acesso para: ${correlationID}`);

      // Aqui você pode: chamar um bot, salvar no DB, enviar e-mail etc.
    }

    return NextResponse.json({ status: 'success', received: true });
  } catch (err) {
    console.error('Erro no webhook:', err);
    return NextResponse.json(
      { error: 'Erro interno no webhook' },
      { status: 500 }
    );
  }
}
