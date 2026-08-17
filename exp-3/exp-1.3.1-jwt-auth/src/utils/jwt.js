/**
 * JWT Helper Utility for Stateless Authentication
 * Implements standard 3-part JSON Web Token encoding, decoding, and validation.
 */

const TOKEN_KEY = 'jwt_token';
const SECRET_KEY = 'super_secret_jwt_key_exp3';

/**
 * Base64Url encode helper
 */
function base64UrlEncode(str) {
  const base64 = btoa(str);
  return base64
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Base64Url decode helper
 */
function base64UrlDecode(base64Url) {
  let base64 = base64Url
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  while (base64.length % 4) {
    base64 += '=';
  }
  
  try {
    return atob(base64);
  } catch (e) {
    return null;
  }
}

/**
 * Simple pseudo signature generator for demonstration
 */
function generateSignature(encodedHeader, encodedPayload) {
  const input = `${encodedHeader}.${encodedPayload}.${SECRET_KEY}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return base64UrlEncode(Math.abs(hash).toString(16) + 'signature_valid');
}

/**
 * Generate a standard 3-part JWT token
 * @param {Object} userData - User information
 * @param {number} expiresInSeconds - Token validity duration (default 1 hour)
 */
export function createJWT(userData, expiresInSeconds = 3600) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: userData.username || 'user',
    username: userData.username || 'AdminUser',
    role: userData.role || 'Administrator',
    email: `${userData.username || 'admin'}@example.com`,
    iat: now,
    exp: now + expiresInSeconds,
    iss: 'FullStack2-Exp3-Auth'
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = generateSignature(encodedHeader, encodedPayload);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Decode token without verification (returns parsed Header and Payload)
 */
export function decodeJWT(token) {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const headerJson = base64UrlDecode(parts[0]);
    const payloadJson = base64UrlDecode(parts[1]);

    return {
      header: JSON.parse(headerJson),
      payload: JSON.parse(payloadJson),
      signature: parts[2],
      raw: token
    };
  } catch (err) {
    console.error('Error decoding JWT token:', err);
    return null;
  }
}

/**
 * Verify token integrity and check expiration
 */
export function verifyJWT(token) {
  const decoded = decodeJWT(token);
  if (!decoded) {
    return { valid: false, reason: 'Invalid Token Format' };
  }

  const now = Math.floor(Date.now() / 1000);
  if (decoded.payload.exp && decoded.payload.exp < now) {
    return { valid: false, reason: 'Token Expired', decoded };
  }

  const parts = token.split('.');
  const expectedSig = generateSignature(parts[0], parts[1]);
  if (parts[2] !== expectedSig) {
    return { valid: false, reason: 'Invalid Signature', decoded };
  }

  return { valid: true, decoded };
}

/**
 * LocalStorage Helpers for Stateless Token Session Management
 */
export function saveStoredToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}
