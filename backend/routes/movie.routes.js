import express from 'express';

const router = express.Router();

import { addMovie, markMovie, getMovies } from '../controllers/movie.controller.js'
import { auth } from '../middleware/auth.middleware.js';


router.post("/addMovie", auth, addMovie);
router.post("/markMovie/:movieId", auth, markMovie);
router.get("/getMovies", getMovies);


export default router;