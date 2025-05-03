import { createClient } from '@supabase/supabase-js'
import { Handler } from '@netlify/functions'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const payload = JSON.parse(event.body || '{}')
    const signature = event.headers['helio-signature']

    // TODO: Implementar verificação de assinatura
    // if (!verifySignature(payload, signature)) {
    //   return {
    //     statusCode: 401,
    //     body: JSON.stringify({ error: 'Invalid signature' })
    //   }
    // }

    const { event: eventType, data } = payload

    if (eventType === 'payment.success') {
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
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to record transaction' })
        }
      }

      // Atualizar status de acesso do usuário
      const { error: userError } = await supabase
        .from('users')
        .update({ has_access: true })
        .eq('email', customer.email)

      if (userError) {
        console.error('Erro ao atualizar acesso do usuário:', userError)
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to update user access' })
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  } catch (error) {
    console.error('Erro no webhook:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
} 