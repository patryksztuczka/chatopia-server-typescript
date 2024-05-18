import express, { Router } from 'express';

import userRoutes from './user-routes';
import conversationRoutes from './conversation-routes';

const router: Router = express.Router();

router.use('/users', userRoutes);
router.use('/conversations', conversationRoutes);

export default router;
