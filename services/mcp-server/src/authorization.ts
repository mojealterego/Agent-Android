export type ToolPolicy = {
  toolId: string;
  requiredPermissions: readonly string[];
  consequential: boolean;
};

export type ToolAuthorizationContext = {
  organizationId: string;
  actorId: string;
  sessionId: string;
  permissions: ReadonlySet<string>;
  approvalGranted?: boolean;
};

export type ToolAuthorizationDecision = {
  allowed: boolean;
  approvalRequired: boolean;
  reason: string;
};

/**
 * Explicit registry. Anything not present here is denied by default.
 * Registration is deliberately separate from transport/tool discovery so a
 * discovered MCP tool cannot become executable merely by being visible.
 */
export const TOOL_POLICIES: ReadonlyMap<string, ToolPolicy> = new Map([
  [
    'plan_goal',
    {
      toolId: 'plan_goal',
      requiredPermissions: ['agent.plan'],
      consequential: false,
    },
  ],
  [
    'health_check',
    {
      toolId: 'health_check',
      requiredPermissions: ['system.health'],
      consequential: false,
    },
  ],
]);

export function authorizeToolInvocation(
  toolId: string,
  context: ToolAuthorizationContext,
): ToolAuthorizationDecision {
  const policy = TOOL_POLICIES.get(toolId);

  if (!policy) {
    return {
      allowed: false,
      approvalRequired: false,
      reason: 'Tool is not registered in the explicit authorization registry.',
    };
  }

  const missingPermission = policy.requiredPermissions.find(
    (permission) => !context.permissions.has(permission),
  );

  if (missingPermission) {
    return {
      allowed: false,
      approvalRequired: false,
      reason: `Missing required permission: ${missingPermission}.`,
    };
  }

  if (policy.consequential && !context.approvalGranted) {
    return {
      allowed: false,
      approvalRequired: true,
      reason: 'Consequential tool execution requires explicit approval.',
    };
  }

  return {
    allowed: true,
    approvalRequired: false,
    reason: 'Tool is explicitly registered and authorized for this execution context.',
  };
}
