import { createHmac, timingSafeEqual } from 'node:crypto';

export type AuthenticatedSession = {
  sessionId: string;
  actorId: string;
  organizationId: string;
  expiresAt: number;
};

type SessionClaims = AuthenticatedSession & {
  version: 1;
};

const SESSION_VERSION = 1;

function encode(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function decode(value: string): string {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function signature(secret: string, payload: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createSessionToken(
  session: AuthenticatedSession,
  secret: string,
): string {
  if (!secret) {
    throw new Error('AUTH_SESSION_SECRET is required.');
  }

  const claims: SessionClaims = { ...session, version: SESSION_VERSION };
  const payload = encode(JSON.stringify(claims));
  return `${payload}.${signature(secret, payload)}`;
}

export function verifySessionToken(
  token: string,
  secret: string,
  now = Date.now(),
): AuthenticatedSession | null {
  if (!secret) return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payload, providedSignature] = parts;
  const expectedSignature = signature(secret, payload);
  const provided = Buffer.from(providedSignature, 'base64url');
  const expected = Buffer.from(expectedSignature, 'base64url');

  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return null;
  }

  try {
    const claims = JSON.parse(decode(payload)) as Partial<SessionClaims>;

    if (
      claims.version !== SESSION_VERSION ||
      typeof claims.sessionId !== 'string' ||
      typeof claims.actorId !== 'string' ||
      typeof claims.organizationId !== 'string' ||
      typeof claims.expiresAt !== 'number'
    ) {
      return null;
    }

    if (!Number.isSafeInteger(claims.expiresAt) || claims.expiresAt <= now) {
      return null;
    }

    return {
      sessionId: claims.sessionId,
      actorId: claims.actorId,
      organizationId: claims.organizationId,
      expiresAt: claims.expiresAt,
    };
  } catch {
    return null;
  }
}

export function readBearerToken(authorization: string | undefined): string | null {
  if (!authorization) return null;
  const match = /^Bearer\s+([^\s]+)$/i.exec(authorization.trim());
  return match?.[1] ?? null;
}
