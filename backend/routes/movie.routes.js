const express = require("express");
const router = express.Router();

const {registerMovie}= require('../controllers/movie.controller.js')
const { authMiddleware } = require("../middleware/auth.middleware.js");


router.post("/register",authMiddleware, registerMovie);


module.exports = router;