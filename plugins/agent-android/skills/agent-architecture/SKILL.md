---
name: agent-architecture
description: Design and review Agent Android systems as modular, secure, observable agent platforms spanning Android, agent runtime, MCP, Skills, APIs, and deployment.
---

# Agent architecture

## Decision order
1. Define the user outcome and operational constraints.
2. Keep mobile responsible for presentation, local interaction, and non-sensitive client state.
3. Keep credentials, authorization, privileged integrations, and consequential actions server-side.
4. Expose narrow MCP tools mapped to recognizable user goals.
5. Use Skills for repeatable procedures and domain operating rules.
6. Version public contracts and preserve backward compatibility.
7. Instrument failures, latency, tool calls, and authorization decisions without logging secrets.

## Review gates
- Build must fail on type errors.
- Public tool schemas must be explicit.
- Read-only and write/destructive tools must be accurately annotated.
- Authorization must be enforced outside the model.
- Secrets must come from deployment secret management.
- Android production artifacts must be reproducible through CI/EAS.
