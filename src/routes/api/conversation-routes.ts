import express, { Router } from 'express';

import {
  createMessageController,
  getConversationMessagesController
} from '../../controllers/conversation-controllers';

const router: Router = express.Router();

router.get('/:conversationId/messages', getConversationMessagesController);

router.post('/:conversationId/messages', createMessageController);

export default router;
