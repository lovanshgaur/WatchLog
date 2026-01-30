import express from 'express';

const router = express.Router();

import { postMovie, markMovie, getMovies } from '../controllers/movie.controller.js';

router.get('/', getMovies);
router.get('/post', postMovie);
router.get('/mark', markMovie);

export default router
