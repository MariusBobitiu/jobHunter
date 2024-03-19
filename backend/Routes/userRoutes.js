const express = require("express");
const userController = require("../Controllers/userController");
const { signup, signin } = userController;
const userAuth = require("../Middlewares/userAuth");

const router = express.Router();

// Sign up a new user
router.post("/signup", userAuth, signup);

// Login a user
router.post("/signin", signin);

module.exports = router;
