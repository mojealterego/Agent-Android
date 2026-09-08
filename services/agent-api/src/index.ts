import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { z } from 'zod';

const app = new Hono();
const AskSchema = z.object({
  message: z.string().min(1).max(20000),
  conversationId: z.string().min(1).max(128).optional(),
});

app.get('/health', (c) => c.json({ status: 'ok', service: 'agent-api', version: '0.1.0' }));

app.post('/v1/agent/ask', async (c) => {
  const payload = AskSchema.safeParse(await c.req.json().catch(() => null));
  if (!payload.success) {
    return c.json({ error: { code: 'INVALID_REQUEST', message: 'Invalid request payload.' } }, 400);
  }
  return c.json({
    conversationId: payload.data.conversationId ?? crypto.randomUUID(),
    status: 'accepted',
    message: 'Agent runtime boundary is ready for model/tool orchestration.',
    echo: payload.data.message,
  }, 202);
});

const port = Number(process.env.PORT ?? 8787);
serve({ fetch: app.fetch, port }, () => {
  console.log(`agent-api listening on :${port}`);
});

export default app;
