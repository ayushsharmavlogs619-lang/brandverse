import { ApplicationServerKeys } from 'webpush-webcrypto';

function base64urlToUint8Array(value: string): Uint8Array {
  const padding = '='.repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function uint8ToBase64url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

/**
 * Build ApplicationServerKeys from VAPID keys in the format that
 * `npx web-push generate-vapid-keys` produces:
 *   - publicKeyB64Url: 65 bytes uncompressed (0x04 || X(32) || Y(32))
 *   - privateKeyB64Url: 32-byte scalar `d`
 */
export async function buildApplicationServerKeys(
  publicKeyB64Url: string,
  privateKeyB64Url: string,
): Promise<ApplicationServerKeys> {
  const pub = base64urlToUint8Array(publicKeyB64Url);
  if (pub.length !== 65 || pub[0] !== 0x04) {
    throw new Error('VAPID public key must be 65 uncompressed bytes (0x04 || X || Y)');
  }
  const x = uint8ToBase64url(pub.slice(1, 33));
  const y = uint8ToBase64url(pub.slice(33, 65));
  const d = privateKeyB64Url.replace(/=+$/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const publicKey = await crypto.subtle.importKey(
    'jwk',
    { kty: 'EC', crv: 'P-256', x, y, ext: true },
    { name: 'ECDSA', namedCurve: 'P-256' },
    true,
    [],
  );
  const privateKey = await crypto.subtle.importKey(
    'jwk',
    { kty: 'EC', crv: 'P-256', x, y, d, ext: true },
    { name: 'ECDSA', namedCurve: 'P-256' },
    true,
    ['sign'],
  );
  return new ApplicationServerKeys(publicKey, privateKey);
}
