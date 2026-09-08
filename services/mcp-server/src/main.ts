import { createServer } from 'node:http';
import { createMcpHandler, toNodeHandler } from '@modelcontextprotocol/node';
import { server } from './index.js';

const port = Number(process.env.MCP_PORT ?? 8788);

const mcpHandler = createMcpHandler(() => server);
const nodeHandler = toNodeHandler(mcpHandler);

const httpServer = createServer(async (req, res) => {
  try {
    if (req.url === '/health') {
      res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
      res.end(JSON.stringify({ status: 'ok', service: 'agent-android-mcp', version: '0.2.0' }));
      return;
    }

    if (req.url?.startsWith('/mcp')) {
      await nodeHandler(req, res);
      return;
    }

    res.writeHead(404, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: { code: 'NOT_FOUND', message: 'Route not found.' } }));
  } catch (error) {
    console.error(JSON.stringify({
      event: 'mcp_http_error',
      error: error instanceof Error ? error.message : 'unknown_error',
    }));

    if (!res.headersSent) {
      res.writeHead(500, { 'content-type': 'application/json; charset=utf-8' });
    }
    res.end(JSON.stringify({ error: { code: 'INTERNAL_ERROR', message: 'MCP request failed.' } }));
  }
});

httpServer.listen(port, () => {
  console.log(`agent-android-mcp listening on :${port}`);
});
