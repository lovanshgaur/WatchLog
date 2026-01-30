import express from 'express';

const router = express.Router();

import { signup, signin } from '../controllers/auth.controller.js'

router.post("/signup", signup);
router.get("/signin", signin);

export default router;