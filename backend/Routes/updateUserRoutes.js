const express = require("express");
const userController = require("../Controllers/userController");
const { updateUser, updatePassword, deleteUser } = userController;

const router = express.Router();

// Update user details
router.put("/:id", updateUser);

// Update user password
router.put("/password/:id", updatePassword);

// Delete a user
router.delete("/:id", deleteUser);

module.exports = router;
