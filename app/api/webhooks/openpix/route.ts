import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.event === 'OPENPIX:CHARGE_COMPLETED') {
      const { charge } = body;
      const correlationID = charge.correlationID;

      console.log(`💥 Pagamento recebido. Desbloquear acesso para: ${correlationID}`);

      // Atualiza o status do usuário no Supabase
      const { error } = await supabase
        .from('users')
        .update({ acesso_bunker: true })
        .eq('id', correlationID);

      if (error) {
        console.error('Erro ao atualizar status:', error);
      }
    }

    // Sempre retorna 200 para a OpenPix
    return NextResponse.json(
      { status: 'success', received: true },
      { status: 200 }
    );
  } catch (err) {
    console.error('Erro no webhook:', err);
    // Mesmo com erro, retorna 200 para a OpenPix
    return NextResponse.json(
      { status: 'success', received: true },
      { status: 200 }
    );
  }
} 