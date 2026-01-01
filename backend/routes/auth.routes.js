const express = require("express");
const router = express.Router();

const {registerUser, loginUser, trial} = require("../controllers/auth.controller.js")
const { authMiddleware } = require("../middleware/auth.middleware.js");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/trial", trial);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "You are logged in",
    user: req.user
  });
});

module.exports = router;