# Agent Android Architecture

## Runtime boundaries

```text
Android client
    |
    | HTTPS / bearer session assertion
    v
Agent API
    |
    +--> verified session context
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
Authentication/session verification boundary, request validation, rate limiting, orchestration, tenant context, audit context, and streaming response boundary. Tenant and actor identity must be derived from verified session claims rather than trusted request fields.

### MCP
Narrow tool contracts, authorization, safety annotations, tool execution, structured results, and external side effects.

### Skills
Reusable operating procedures that constrain execution quality and provide domain-specific workflow guidance.

### Plugin
Distribution package connecting Skills and MCP capabilities for supported Codex/ChatGPT surfaces.

## Implemented security boundary

The agent API verifies a signed, expiring bearer session assertion using `AUTH_SESSION_SECRET`. The assertion carries `sessionId`, `actorId`, and `organizationId`. Missing, malformed, invalid, or expired assertions are rejected before agent execution. If request-supplied actor or organization identifiers are present, they must match the authenticated session; the session remains authoritative.

This is an internal session-verification boundary, not a complete OAuth/OIDC identity provider. A production deployment must connect the verifier to the chosen enterprise identity/session issuer and manage key rotation without sharing long-lived signing material with untrusted clients.

## Production hardening backlog

- OAuth 2.1 / OIDC integration or trusted enterprise session issuer.
- Signing-key rotation and key identifier (`kid`) support.
- Persistent conversation state.
- Streaming responses from the model runtime.
- Tool approval ledger and audit events.
- Structured telemetry and tracing.
- Per-user and per-tool rate limits.
- MCP skills catalog/resource endpoints for submission-time import.
- EAS project identity and production signing configuration.
- End-to-end integration tests against a deployed HTTPS MCP endpoint.
