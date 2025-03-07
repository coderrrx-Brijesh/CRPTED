const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Ensure bcrypt is imported
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const signIn = async (req, res) => {
  try {
    // Fetch the user from the database using the userName
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // On successful authentication, create a JWT token
    const payload = {
      userName: user.userName,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    // Set cookies for both HTTP-only and JavaScript-accessible cookies
    // HTTP-only cookie for security (can't be accessed by JavaScript)
    res.cookie("authToken_http", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "strict",
    });

    // JavaScript-accessible cookie (for frontend auto-login)
    // This is less secure but needed for client-side auth state
    res.cookie("authToken", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "strict",
    });

    // Successful sign-in response with token in body
    res.status(200).json({
      message: "Sign-in successful",
      token: token, // Include token in response body
      user: {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signIn };
