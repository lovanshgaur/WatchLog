import express from 'express';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

import { postMovie, markMovie, getMovies } from '../controllers/movie.controller.js';

router.get('/', getMovies);
router.post('/post', auth, postMovie);
router.post('/mark/:movieId', auth,markMovie);

export default router
