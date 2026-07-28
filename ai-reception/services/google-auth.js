export class GoogleAuth {
  constructor(env) {
    this.env = env;
  }

  async getAccessToken(scopes) {
    const email = this.env.GOOGLE_CLIENT_EMAIL;
    const key = this.env.GOOGLE_PRIVATE_KEY;
    if (!email || !key) {
      throw new Error('Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY');
    }

    const header = { alg: 'RS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const claim = {
      iss: email,
      scope: scopes,
      aud: 'https://www.googleapis.com/oauth2/v4/token',
      exp: now + 3600,
      iat: now,
    };

    const jwt = await this.createJWT(header, claim, key);
    const resp = await fetch('https://www.googleapis.com/oauth2/v4/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      throw new Error(`Google token exchange failed: ${resp.status} ${text}`);
    }

    const data = await resp.json();
    if (!data.access_token) {
      throw new Error('No access_token in Google token response');
    }
    return data.access_token;
  }

  async createJWT(header, claim, privateKey) {
    const encoder = new TextEncoder();

    let pemKey = privateKey.replace(/\\n/g, '\n');
    if (!pemKey.includes('-----BEGIN PRIVATE KEY-----')) {
      pemKey = '-----BEGIN PRIVATE KEY-----\n' + pemKey + '\n-----END PRIVATE KEY-----';
    }

    const derBase64 = pemKey
      .replace(/-----BEGIN PRIVATE KEY-----/g, '')
      .replace(/-----END PRIVATE KEY-----/g, '')
      .replace(/\s/g, '');

    const encodedHeader = this.base64Url(JSON.stringify(header));
    const encodedPayload = this.base64Url(JSON.stringify(claim));
    const signatureInput = `${encodedHeader}.${encodedPayload}`;

    const keyData = this.base64Decode(derBase64);
    const cryptoKey = await crypto.subtle.importKey(
      'pkcs8',
      keyData,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign'],
    );

    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      encoder.encode(signatureInput),
    );

    const encodedSig = this.base64Url(String.fromCharCode(...new Uint8Array(signature)));
    return `${signatureInput}.${encodedSig}`;
  }

  base64Url(str) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  base64Decode(base64) {
    const cleaned = base64.replace(/-/g, '+').replace(/_/g, '/');
    const pad = cleaned + '='.repeat((4 - (cleaned.length % 4)) % 4);
    const binary = atob(pad);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }
}