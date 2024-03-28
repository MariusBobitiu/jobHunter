const express = require("express");
const userController = require("../Controllers/userController");
const { updateGoal } = userController;

const router = express.Router();

// Update user's goal
router.put("/:id", updateGoal);

module.exports = router;
