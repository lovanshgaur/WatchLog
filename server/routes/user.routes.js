import express from 'express';

const router = express.Router();

import { changeAvatar, changePassword } from '../controllers/user.controller.js'

router.get('/avatar', changeAvatar);
router.get('/password', changePassword);

export default router
