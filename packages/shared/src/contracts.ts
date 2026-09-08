import { z } from 'zod';

export const AgentAskRequest = z.object({
  message: z.string().min(1).max(20_000),
  conversationId: z.string().min(1).max(128).optional(),
});

export const AgentAcceptedResponse = z.object({
  conversationId: z.string(),
  status: z.literal('accepted'),
  message: z.string(),
});

export type AgentAskRequest = z.infer<typeof AgentAskRequest>;
export type AgentAcceptedResponse = z.infer<typeof AgentAcceptedResponse>;
