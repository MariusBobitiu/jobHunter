const express = require("express");
const userController = require("../Controllers/userController");
const { userVerification } = require("../Middlewares/userAuth");
const { updateUser, updatePassword, deleteUser } = userController;

const router = express.Router();

// Update user details
router.put("/:id", userVerification, updateUser);

// Update user password
router.put("/password/:id", userVerification, updatePassword);

// Delete a user
router.delete("/:id", userVerification, deleteUser);

module.exports = router;
