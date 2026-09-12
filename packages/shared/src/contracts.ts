import { z } from 'zod';

export const AgentAskRequest = z.object({
  message: z.string().min(1).max(20_000),
  conversationId: z.string().min(1).max(128).optional(),
  organizationId: z.string().min(1).max(128).optional(),
  actorId: z.string().min(1).max(128).optional(),
});

export const AgentAcceptedResponse = z.object({
  conversationId: z.string(),
  status: z.literal('accepted'),
  message: z.string(),
});

export const AgentExecutionContext = z.object({
  organizationId: z.string().min(1).max(128),
  actorId: z.string().min(1).max(128),
  sessionId: z.string().min(1).max(128),
});

export const ToolAuthorizationRequest = z.object({
  toolId: z.string().min(1).max(128),
  context: AgentExecutionContext,
  consequential: z.boolean(),
});

export const ToolAuthorizationDecision = z.object({
  allowed: z.boolean(),
  approvalRequired: z.boolean(),
  reason: z.string().min(1).max(500),
});

export type AgentAskRequest = z.infer<typeof AgentAskRequest>;
export type AgentAcceptedResponse = z.infer<typeof AgentAcceptedResponse>;
export type AgentExecutionContext = z.infer<typeof AgentExecutionContext>;
export type ToolAuthorizationRequest = z.infer<typeof ToolAuthorizationRequest>;
export type ToolAuthorizationDecision = z.infer<typeof ToolAuthorizationDecision>;
