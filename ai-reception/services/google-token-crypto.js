// AES-GCM encryption for Google OAuth refresh tokens
// Uses Web Crypto API available in Cloudflare Workers

const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256; // bits
const IV_LENGTH = 12; // bytes (recommended for GCM)

/**
 * Encrypt a Google refresh token using AES-GCM
 * @param {string} token - The refresh token to encrypt
 * @param {object} env - Cloudflare Worker environment with GOOGLE_TOKEN_ENCRYPTION_KEY
 * @returns {Promise<{ciphertext: string, iv: string}>} Base64-encoded ciphertext and IV
 */
export async function encryptRefreshToken(token, env) {
  if (!env.GOOGLE_TOKEN_ENCRYPTION_KEY) {
    throw new Error('GOOGLE_TOKEN_ENCRYPTION_KEY not configured');
  }

  const key = await deriveKey(env.GOOGLE_TOKEN_ENCRYPTION_KEY);
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const encoder = new TextEncoder();
  const data = encoder.encode(token);

  const ciphertext = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    data
  );

  return {
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
    iv: btoa(String.fromCharCode(...iv))
  };
}

/**
 * Decrypt a Google refresh token using AES-GCM
 * @param {string} ciphertext - Base64-encoded ciphertext
 * @param {string} iv - Base64-encoded IV
 * @param {object} env - Cloudflare Worker environment with GOOGLE_TOKEN_ENCRYPTION_KEY
 * @returns {Promise<string>} The decrypted refresh token
 */
export async function decryptRefreshToken(ciphertext, iv, env) {
  if (!env.GOOGLE_TOKEN_ENCRYPTION_KEY) {
    throw new Error('GOOGLE_TOKEN_ENCRYPTION_KEY not configured');
  }

  const key = await deriveKey(env.GOOGLE_TOKEN_ENCRYPTION_KEY);
  const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
  const ciphertextBytes = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));

  const decrypted = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv: ivBytes },
    key,
    ciphertextBytes
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

/**
 * Derive a crypto key from the encryption key string
 * @param {string} keyString - The encryption key from environment
 * @returns {Promise<CryptoKey>} AES-GCM key
 */
async function deriveKey(keyString) {
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(keyString);

  // Import as raw key material
  const importedKey = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    'HKDF',
    false,
    ['deriveKey']
  );

  // Derive AES-GCM key using HKDF
  return crypto.subtle.deriveKey(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: new Uint8Array(0), // No salt for simplicity
      info: encoder.encode('nexus-google-token-encryption')
    },
    importedKey,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}
