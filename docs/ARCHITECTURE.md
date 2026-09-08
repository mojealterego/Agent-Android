# Agent Android Architecture

## Runtime boundaries

```text
Android client
    |
    | HTTPS / authenticated session
    v
Agent API
    |
    +--> Agent runtime / model orchestration
    |
    +--> MCP server
    |       +--> focused tools
    |       +--> authorization
    |       +--> resources / Skills
    |
    +--> persistence / external integrations
```

## Responsibilities

### Android
Presentation, local interaction, navigation, accessibility, offline-safe UI state, and session UX. No privileged provider keys.

### Agent API
Authentication/session boundary, request validation, rate limiting, orchestration, audit context, and streaming response boundary.

### MCP
Narrow tool contracts, authorization, safety annotations, tool execution, structured results, and external side effects.

### Skills
Reusable operating procedures that constrain execution quality and provide domain-specific workflow guidance.

### Plugin
Distribution package connecting Skills and MCP capabilities for supported Codex/ChatGPT surfaces.

## Production hardening backlog

- OAuth 2.1 / session token implementation.
- Persistent conversation state.
- Streaming responses from the model runtime.
- Tool approval ledger and audit events.
- Structured telemetry and tracing.
- Per-user and per-tool rate limits.
- MCP skills catalog/resource endpoints for submission-time import.
- EAS project identity and production signing configuration.
- End-to-end integration tests against a deployed HTTPS MCP endpoint.
