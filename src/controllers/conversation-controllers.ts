import { Request, Response } from 'express';

import {
  CreateMessageSchema,
  GetConversationMessagesSchema,
  GetConversationSchema
} from '../libs/zod/conversation-schemas';
import { supabase } from '../libs/supabase/config';

export const getConversationMessagesController = async (
  req: Request,
  res: Response
) => {
  try {
    const validationResult = GetConversationMessagesSchema.safeParse(
      req.params
    );

    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error });
    }

    const { conversationId } = validationResult.data;

    const { data, error } = await supabase
      .from('message')
      .select('*')
      .eq('conversationId', conversationId);

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(200).json({ data: [] });
    }

    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createMessageController = async (req: Request, res: Response) => {
  try {
    const conversationIdValidationResult = GetConversationSchema.safeParse(
      req.params
    );

    if (!conversationIdValidationResult.success) {
      return res
        .status(400)
        .json({ error: conversationIdValidationResult.error });
    }

    const createMessageValidationResult = CreateMessageSchema.safeParse(
      req.body
    );

    if (!createMessageValidationResult.success) {
      return res
        .status(400)
        .json({ error: createMessageValidationResult.error });
    }

    const { conversationId } = conversationIdValidationResult.data;

    const { data: conversation, error: conversationError } = await supabase
      .from('conversation')
      .select('*')
      .eq('id', conversationId)
      .single();

    if (conversationError) {
      throw conversationError;
    }

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const { userId, messageContent } = createMessageValidationResult.data;

    const { data: message, error: messageError } = await supabase
      .from('message')
      .insert([
        {
          userId,
          conversationId,
          messageContent
        }
      ]);

    if (messageError) {
      throw messageError;
    }

    return res.status(201).json({ data: true });
  } catch (error) {
    res.status(500).json({ error });
  }
};
