import z from 'zod';

export const GetUserSchema = z.object({
  userId: z.string().uuid()
});

export const GetUserConversationsSchema = z.object({
  userId: z.string().uuid()
});
