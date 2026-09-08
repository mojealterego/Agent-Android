# Security

## Non-negotiable boundaries

- Never commit API keys, OAuth client secrets, signing keys, or user tokens.
- Validate every external input at the server boundary.
- Authorize every private-data access and every state-changing action on the server.
- Prefer read-only discovery and preview before consequential writes.
- Rate-limit externally visible or expensive operations.
- Redact secrets and unnecessary personal data from logs.
- Rotate compromised credentials immediately through the deployment secret manager.

## Mobile

The Android client must not embed privileged provider credentials. Client authentication should use short-lived/session-scoped credentials issued by the backend.
