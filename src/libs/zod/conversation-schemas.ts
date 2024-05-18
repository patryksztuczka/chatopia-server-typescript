import z from 'zod';

export const GetConversationSchema = z.object({
  conversationId: z.string().uuid()
});

export const GetConversationMessagesSchema = z.object({
  conversationId: z.string().uuid()
});

export const CreateMessageSchema = z.object({
  userId: z.string().uuid(),
  messageContent: z.string().min(1).max(500)
});
