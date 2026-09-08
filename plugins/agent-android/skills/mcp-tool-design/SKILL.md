---
name: mcp-tool-design
description: Design focused MCP tools for Agent Android with explicit schemas, safety annotations, authorization boundaries, and verifiable outputs.
---

# MCP tool design

## Rules
- One tool should represent one recognizable user goal or atomic action.
- Use explicit, bounded input schemas.
- Return concise structured content with stable identifiers.
- Mark read-only, destructive, and open-world behavior accurately.
- Never treat model intent as authorization.
- Keep secrets and unnecessary personal data out of tool results.
- For consequential actions, expose a preview/plan phase before execution.

## Output contract
Every action should make it possible to determine:
- what was requested,
- what was actually executed,
- what identifiers were affected,
- whether approval was required,
- what evidence or errors remain.
