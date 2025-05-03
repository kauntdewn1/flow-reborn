import { createClient } from '@supabase/supabase-js'
import { Handler } from '@netlify/functions'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const verifyHelioToken = (token: string | null): boolean => {
  if (!token) return false
  return token === `Bearer ${process.env.HELIO_SHARED_TOKEN}`
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // Verificar token do Helio
    const authHeader = event.headers['authorization']
    if (!verifyHelioToken(authHeader)) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid authorization token' })
      }
    }

    const payload = JSON.parse(event.body || '{}')
    const { event: eventType, email, subscriptionState, subscriptionId, transactionObject } = payload

    if (eventType === 'STARTED' && subscriptionState === 'NEW') {
      const { meta } = transactionObject

      // Registrar transação no Supabase
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          customer_id: meta.customerDetails.email,
          payment_id: transactionObject.id,
          amount: meta.amount,
          currency: meta.currency.id,
          status: meta.transactionStatus,
          metadata: {
            subscriptionId,
            subscriptionState,
            transactionType: meta.transactionType,
            customerDetails: meta.customerDetails,
            tokenQuote: meta.tokenQuote
          }
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
        .update({ 
          has_access: true,
          subscription_id: subscriptionId,
          subscription_state: subscriptionState,
          last_payment_date: new Date().toISOString()
        })
        .eq('email', email)

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