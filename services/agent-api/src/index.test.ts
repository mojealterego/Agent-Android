import { describe, expect, it } from 'vitest';
import app from './index.js';

describe('agent API security contract', () => {
  it('rejects requests without organization and actor context', async () => {
    const response = await app.request('/v1/agent/ask', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: 'test' }),
    });

    expect(response.status).toBe(400);
  });
});
