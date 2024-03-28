const express = require("express");
const userController = require("../Controllers/userController");
const { signup, signin, forgotPassword, resetPassword, verifyToken } =
  userController;
const userAuth = require("../Middlewares/userAuth");

const router = express.Router();

// Sign up a new user
router.post("/signup", userAuth, signup);

// Login a user
router.post("/signin", signin);

// Forgot password
router.patch("/forgot-password", forgotPassword);

// Reset password
router.patch("/reset-password/:token", resetPassword);

// Verify token
router.post("/verify-token", verifyToken);

module.exports = router;
