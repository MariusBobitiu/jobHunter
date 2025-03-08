const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sendEmail = require("../utils/sendEmail");

dotenv.config();

// Assign users to the variable User
const User = db.users;

// Sign up a new user
// Hashing the password and saving the user to the database
const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      username: userName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    //save user to the database
    const user = await User.create(data);

    // Create a token
    // Set Cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      res.cookie("token", token, {
        maxAge: parseInt(process.env.COOKIE_EXPIRATION),
        withCredentials: true,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      // Send user details
      return res
        .status(200)
        .send({ id: user.id, username: user.username, email: user.email });
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.error("Error in user creation:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Login a user

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });

    // If the user exists, compare the password
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      console.log("validPassword", validPassword);

      // If the password is valid, create a token
      if (validPassword) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRATION,
        });

        // If password is valid, set cookie with the token generated
        res.cookie("token", token, {
          maxAge: parseInt(process.env.COOKIE_EXPIRATION),
          withCredentials: true,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });

        // Send user details
        return res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          goalValue: user.goalValue,
          timeFrame: user.timeFrame,
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in user login" });
  }
};

updateUser = async (req, res) => {
  try {
    const { userName, email } = req.body;
    const { id } = req.params;

    // Check if the user exists
    const user = await User.findOne({ where: { id } });

    // If the user exists, update the user details
    if (user) {
      const data = {
        username: userName,
        email,
        updatedAt: Date.now(),
      };

      // Update the user details
      await User.update(data, { where: { id } });

      // Send user details
      return res
        .status(200)
        .send({ username: user.username, email: user.email });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error in updating user ${error}` });
  }
};

updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    // Check if the user exists
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the old password
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Wrong Old Password" });
    }
    // If the user exists, update the password
    const data = {
      password: await bcrypt.hash(newPassword, 10),
    };

    // Update the user password
    await User.update(data, { where: { id } });

    // Send user details
    return res.status(200).send({ username: user.username, email: user.email });
  } catch (error) {
    return res.status(500).json({ message: "Error in updating password" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user exists
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await User.destroy({ where: { id } });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset link
    const resetLink = jwt.sign(
      { email: user.email, issued: Date.now() },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    await User.update({ resetLink }, { where: { email } });

    // Send the reset link to the user
    sendEmail(user, resetLink);
    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const resetLink = req.params.token;
  const newPassword = req.body.password;

  if (resetLink) {
    jwt.verify(resetLink, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Token expired or invalid" });
      }

      try {
        const [user] = await User.findAll({ where: { resetLink } });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        await User.update({ password: hashPassword }, { where: { resetLink } });

        await User.update({ resetLink: "" }, { where: { resetLink } });

        return res.status(200).json({ message: "Password reset successfully" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });
  } else {
    return res.status(401).json({ message: "Authentication error" });
  }
};

const verifyToken = async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication error" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Token expired or invalid" });
    }

    try {
      const [user] = await User.findAll({ where: { resetLink: token } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "Token verified" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
};

const updateGoal = async (req, res) => {
  try {
    const { goalValue, timeFrame } = req.body;
    const { id } = req.params;

    // Check if the user exists
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user goal
    const data = {
      goalValue,
      timeFrame,
    };

    await User.update(data, { where: { id } });

    // Send user details
    return res.status(200).send({ goalValue, timeFrame });
  } catch (error) {
    return res.status(500).json({ message: "Error in updating goal" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    withCredentials: true,
  });
  return res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  signup,
  signin,
  updateUser,
  updatePassword,
  deleteUser,
  forgotPassword,
  resetPassword,
  verifyToken,
  updateGoal,
  logout,
};
