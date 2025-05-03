import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const signature = request.headers.get("helio-signature")

    // TODO: Implementar verificação de assinatura
    // if (!verifySignature(payload, signature)) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    // }

    const { event, data } = payload

    if (event === "payment.success") {
      const { customer, payment } = data

      // Registrar transação no Supabase
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          customer_id: customer.id,
          payment_id: payment.id,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          metadata: payment.metadata,
        })

      if (transactionError) {
        console.error('Erro ao registrar transação:', transactionError)
        return NextResponse.json({ error: 'Failed to record transaction' }, { status: 500 })
      }

      // Atualizar status de acesso do usuário
      const { error: userError } = await supabase
        .from('users')
        .update({ has_access: true })
        .eq('email', customer.email)

      if (userError) {
        console.error('Erro ao atualizar acesso do usuário:', userError)
        return NextResponse.json({ error: 'Failed to update user access' }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro no webhook:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 