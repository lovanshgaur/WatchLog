import express from 'express';

const router = express.Router();

import { changeAvatar } from '../controllers/user.controller.js'
import { auth } from '../middleware/auth.middleware.js';


router.put("/changeAvatar", auth, changeAvatar);


export default router;