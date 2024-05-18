import { Request, Response } from 'express';

import { supabase } from '../libs/supabase/config';
import {
  GetUserConversationsSchema,
  GetUserSchema
} from '../libs/zod/user-schemas';

export const getUserController = async (req: Request, res: Response) => {
  try {
    const validationResult = GetUserSchema.safeParse(req.params);

    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error });
    }

    const { userId } = validationResult.data;

    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getUserConversationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const validationResult = GetUserConversationsSchema.safeParse(req.params);

    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error });
    }

    const { userId } = validationResult.data;

    const { data, error } = await supabase
      .from('conversation')
      .select('*, conversationMember()')
      .eq('conversationMember.userId', userId);

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
