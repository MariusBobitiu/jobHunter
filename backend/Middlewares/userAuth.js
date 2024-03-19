const db = require("../Models");
const User = db.users;

const saveUser = async (req, res, next) => {
  // Extract and rename userName to username from the request body
  const { userName: username, email } = req.body;

  try {
    // Search for a user by username in the database
    const usernameExists = await User.findOne({
      where: { username },
    });

    if (usernameExists) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Check if email is already in use
    const emailExists = await User.findOne({
      where: { email },
    });

    if (emailExists) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // If both checks pass, proceed to the next middleware or controller action
    next();
  } catch (error) {
    console.error("Error in user creation middleware:", error);
    return res.status(500).send("Error in user creation!");
  }
};

module.exports = saveUser;

// Path: backend/Middlewares/userAuth.js
