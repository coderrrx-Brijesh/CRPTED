const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Ensure bcrypt is imported
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const signIn = async (req, res) => {
  try {
    // Fetch the user from the database using the username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // On successful authentication, create a JWT token
    const payload = {
      username: user.username,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    // Store the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent access from JavaScript
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Successful sign-in response
    res.status(200).json({
      message: "Sign-in successful",
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: token
      },
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signIn };
