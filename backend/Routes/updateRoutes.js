const express = require("express");
const { updateUser } = require("../Controllers/userController");
const userAuth = require("../Middlewares/userAuth");

const router = express.Router();

// Update a user by id
router.put("/:id", userAuth, updateUser);

module.exports = router;
