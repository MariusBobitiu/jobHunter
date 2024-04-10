const db = require("../Models");
const User = db.users;
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const saveUser = async (req, res, next) => {
  // Extract and rename userName to username from the request body
  const { userName: username, email } = req.body;

  try {
    // Search for a user by username in the database
    const usernameExists = await User.findOne({
      where: { username },
    });

    if (usernameExists) {
      return res
        .status(409)
        .json({ status: false, message: "Username already exists" });
    }

    // Check if email is already in use
    const emailExists = await User.findOne({
      where: { email },
    });

    if (emailExists) {
      return res
        .status(409)
        .json({ status: false, message: "Email already in use" });
    }

    // If both checks pass, proceed to the next middleware or controller action
    next();
  } catch (error) {
    console.error("Error in user creation middleware:", error);
    return res.status(500).send("Error in user creation!");
  }
};

const userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    const user = await User.findOne({ where: { id: decoded.id } });

    if (user) {
      return res.status(200).json({
        status: true,
        message: "Authorized",
      });
    } else
      return res.status(401).json({ status: false, message: "Unauthorized" });
  });
};

module.exports = { saveUser, userVerification };

// Path: backend/Middlewares/userAuth.js
