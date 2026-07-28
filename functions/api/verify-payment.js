const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const keySecret = env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    console.error('[api/verify-payment] Missing RAZORPAY_KEY_SECRET');
    return jsonResponse({ error: 'Payment service not configured' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return jsonResponse({ error: 'Missing required payment fields' }, 400);
  }

  const message = `${razorpay_order_id}|${razorpay_payment_id}`;

  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(keySecret);
    const messageData = encoder.encode(message);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );

    const signatureBytes = await crypto.subtle.sign('HMAC', cryptoKey, messageData);

    const generatedSignature = Array.from(new Uint8Array(signatureBytes))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    if (generatedSignature === razorpay_signature) {
      return jsonResponse({
        success: true,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      });
    }

    return jsonResponse({ success: false, error: 'Signature mismatch' }, 400);
  } catch (err) {
    console.error('[api/verify-payment] crypto error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}
