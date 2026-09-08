# Agent Android MCP Server

Streamable HTTP MCP service for Agent Android. The production endpoint is `/mcp`; `/health` is a lightweight liveness endpoint.

The server starts with a strict policy: tool inputs are untrusted, authorization belongs to the server, and consequential operations require approval. This follows the provided MCP guidance. 

## Development

```bash
npm install
npm run build
npm run dev
```

Set `MCP_PORT` to override the default port `8788`.
