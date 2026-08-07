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

  const keyId = env.RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.error('[api/create-order] Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET');
    return jsonResponse({ error: 'Payment service not configured' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const amount = body.amount;
  if (!amount || typeof amount !== 'number' || amount < 100) {
    return jsonResponse({ error: 'Amount must be at least 100 paise' }, 400);
  }

  const auth = btoa(`${keyId}:${keySecret}`);

  try {
    const razorpayRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount,
        currency: body.currency || 'INR',
        receipt: body.receipt || `receipt_${Date.now()}`,
        payment_capture: 1,
      }),
    });

    if (!razorpayRes.ok) {
      const errorText = await razorpayRes.text();
      console.error('[api/create-order] Razorpay API error:', razorpayRes.status, errorText);
      return jsonResponse({ error: 'Failed to create order' }, 502);
    }

    const order = await razorpayRes.json();
    return jsonResponse({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error('[api/create-order] request threw:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}
