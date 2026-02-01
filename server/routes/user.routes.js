import express from 'express';

const router = express.Router();

import { changeAvatar, changePassword } from '../controllers/user.controller.js';
import { auth } from '../middleware/auth.middleware.js';

router.post('/avatar', auth, changeAvatar);
router.post('/password', auth, changePassword);

export default router;
