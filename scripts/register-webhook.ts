import fetch from 'node-fetch'

const HELIO_API_URL = 'https://api.hel.io/v1/webhook/paylink/subscription'
const PAYLINK_ID = '68115cb08aced19aace0fcf2'
const TARGET_URL = 'https://flowreborn.netlify.app/.netlify/functions/helio-webhook'

async function registerWebhook() {
  try {
    const response = await fetch(
      `${HELIO_API_URL}?apiKey=${process.env.NEXT_PUBLIC_HELIO_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.HELIO_API_SECRET}`,
          'cache-control': 'no-cache'
        },
        body: JSON.stringify({
          paylinkId: PAYLINK_ID,
          targetUrl: TARGET_URL,
          events: ['STARTED']
        })
      }
    )

    const data = await response.json()
    console.log('Webhook registrado com sucesso:', data)
    
    // Salvar o shared token
    console.log('\nAdicione esta variável ao seu .env:')
    console.log(`HELIO_SHARED_TOKEN=${data.sharedToken}`)
  } catch (error) {
    console.error('Erro ao registrar webhook:', error)
  }
}

registerWebhook() 