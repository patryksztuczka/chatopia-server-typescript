import express, { Router } from 'express';

import {
  getUserController,
  getUserConversationsController
} from '../../controllers/user-controllers';

const router: Router = express.Router();

router.get('/:userId', getUserController);

router.get('/:userId/conversations', getUserConversationsController);

export default router;
