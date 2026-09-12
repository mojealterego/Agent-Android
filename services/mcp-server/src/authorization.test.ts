import { describe, expect, it } from 'vitest';
import { authorizeToolInvocation } from './authorization.js';

const baseContext = {
  organizationId: 'org-1',
  actorId: 'actor-1',
  sessionId: 'session-1',
};

describe('MCP tool authorization', () => {
  it('denies an unknown tool by default', () => {
    const decision = authorizeToolInvocation('unknown_tool', {
      ...baseContext,
      permissions: new Set(['agent.plan']),
    });

    expect(decision.allowed).toBe(false);
    expect(decision.approvalRequired).toBe(false);
  });

  it('denies a registered tool when its permission is missing', () => {
    const decision = authorizeToolInvocation('plan_goal', {
      ...baseContext,
      permissions: new Set(),
    });

    expect(decision.allowed).toBe(false);
    expect(decision.reason).toContain('agent.plan');
  });

  it('allows an explicitly registered non-consequential tool with permission', () => {
    const decision = authorizeToolInvocation('plan_goal', {
      ...baseContext,
      permissions: new Set(['agent.plan']),
    });

    expect(decision.allowed).toBe(true);
    expect(decision.approvalRequired).toBe(false);
  });
});
