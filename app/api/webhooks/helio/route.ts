import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const { buyer_wallet, amount, reference, status } = payload

    if (status === 'PAID') {
      // Buscar usuário pelo wallet
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('wallet', buyer_wallet)
        .single()

      if (userError) {
        console.error('Erro ao buscar usuário:', userError)
        return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 400 })
      }

      // Atualizar status de acesso
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          acesso_bunker: true,
          data_pagamento: new Date().toISOString(),
          status_pagamento: 'PAID'
        })
        .eq('id', user.id)

      if (updateError) {
        console.error('Erro ao atualizar usuário:', updateError)
        return NextResponse.json({ error: 'Erro ao atualizar acesso' }, { status: 500 })
      }

      // Registrar transação
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          amount,
          reference,
          status: 'PAID',
          wallet: buyer_wallet
        })

      if (transactionError) {
        console.error('Erro ao registrar transação:', transactionError)
      }

      return NextResponse.json({ message: 'Pagamento confirmado' })
    }

    return NextResponse.json({ error: 'Pagamento não confirmado' }, { status: 400 })
  } catch (error) {
    console.error('Erro no webhook:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
} 