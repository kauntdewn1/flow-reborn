// netlify/functions/openpix-webhook.js

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const body = JSON.parse(event.body);

    if (body.event === 'OPENPIX:CHARGE_COMPLETED') {
      const { charge } = body;
      const correlationID = charge.correlationID;

      console.log(`💥 Pagamento recebido. Desbloquear acesso para: ${correlationID}`);

      // Aqui você pode: chamar um bot, salvar no DB, enviar e-mail etc.
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success', received: true }),
    };
  } catch (err) {
    console.error('Erro no webhook:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro interno no webhook' }),
    };
  }
}; 