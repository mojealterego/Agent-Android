import { StreamableHTTPServerTransport } from '@modelcontextprotocol/server';
import { createServer } from 'node:http';
import { server } from './index.js';

const port = Number(process.env.MCP_PORT ?? 8788);

const httpServer = createServer(async (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'agent-android-mcp' }));
    return;
  }

  if (req.url !== '/mcp') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  await server.connect(transport);
  await transport.handleRequest(req, res);
});

httpServer.listen(port, () => console.log(`agent-android-mcp listening on :${port}`));
