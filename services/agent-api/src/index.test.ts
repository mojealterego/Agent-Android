import { beforeEach, describe, expect, it } from 'vitest';
import app from './index.js';
import { createSessionToken } from './session.js';

const secret = 'test-session-secret';

function session(overrides: Partial<Parameters<typeof createSessionToken>[0]> = {}) {
  return createSessionToken({
    sessionId: 'session-1',
    actorId: 'actor-1',
    organizationId: 'org-1',
    expiresAt: Date.now() + 60_000,
    ...overrides,
  }, secret);
}

async function ask(options: {
  token?: string;
  actorId?: string;
  organizationId?: string;
} = {}) {
  return app.request('/v1/agent/ask', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(options.token ? { authorization: `Bearer ${options.token}` } : {}),
    },
    body: JSON.stringify({
      message: 'test',
      ...(options.actorId ? { actorId: options.actorId } : {}),
      ...(options.organizationId ? { organizationId: options.organizationId } : {}),
    }),
  });
}

describe('agent API security contract', () => {
  beforeEach(() => {
    process.env.AUTH_SESSION_SECRET = secret;
  });

  it('rejects requests without an authenticated session', async () => {
    const response = await ask();
    expect(response.status).toBe(401);
  });

  it('fails closed when session verification is not configured', async () => {
    delete process.env.AUTH_SESSION_SECRET;
    const response = await ask({ token: 'anything' });
    expect(response.status).toBe(503);
  });

  it('rejects malformed sessions', async () => {
    const response = await ask({ token: 'invalid-token' });
    expect(response.status).toBe(401);
  });

  it('rejects an actor mismatch', async () => {
    const response = await ask({ token: session(), actorId: 'attacker' });
    expect(response.status).toBe(403);
  });

  it('rejects an organization mismatch', async () => {
    const response = await ask({ token: session(), organizationId: 'other-org' });
    expect(response.status).toBe(403);
  });

  it('accepts a valid session and derives execution context from it', async () => {
    const response = await ask({ token: session() });
    expect(response.status).toBe(200);

    const body = await response.json() as {
      executionContext: {
        organizationId: string;
        actorId: string;
        sessionId: string;
      };
    };

    expect(body.executionContext).toEqual({
      organizationId: 'org-1',
      actorId: 'actor-1',
      sessionId: 'session-1',
    });
  });

  it('rejects expired sessions', async () => {
    const token = session({ expiresAt: Date.now() - 1 });
    const response = await ask({ token });
    expect(response.status).toBe(401);
  });
});
