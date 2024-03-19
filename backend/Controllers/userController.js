const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

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

      res.cookie("jwt", token, {
        maxAge: process.env.COOKIE_EXPIRATION,
        domain: "127.0.0.1/",
        sameSite: "None",
        httpOnly: true,
        path: "/",
        partitioned: true,
      });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      // Send user details
      return res.status(200).send(user);
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

      // If the password is valid, create a token
      if (validPassword) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRATION,
        });

        // If password is valid, set cookie with the token generated
        res.cookie("jwt", token, {
          maxAge: parseInt(process.env.COOKIE_EXPIRATION),
          domain: "127.0.0.1",
          sameSite: "None",
          httpOnly: true,
          secure: true,
          partitioned: true,
          path: "/",
        });

        // Send user details
        return res.status(200).send(user);
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
    const { id } = req.params;
    const updateData = req.body;
    const user = await User.findOne({ where: { id } });

    if (updateData.password) {
      updateData.password = await bcrypt.hash(
        updateData.password,
        process.env.SALT_ROUNDS
      );
    }
    const [updated] = await User.update(updateData, { where: { id } });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id } });
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in updating user" });
  }
};

module.exports = { signup, signin, updateUser };
