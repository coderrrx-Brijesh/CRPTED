const express = require("express");
const router = express.Router();

const { validateSignUp, validateSignIn } = require("../Middleware/Validate"); // zod validation
const { registerUser } = require("../controllers/RegisterController");
const { signIn } = require("../controllers/SignInController");
const { getProfile } = require("../controllers/ProfileController");
const { TokenAuth } = require("../Middleware/TokenAuth"); // middleware for user auth
const User = require("../models/userModel"); // Import User model

// POST route for sign-up
router.post("/signup", registerUser);

// route to POST for sign-in
router.post("/signin", signIn); // Use POST instead of GET

// GET route for verifying token and getting user data
router.get("/user", TokenAuth, async (req, res) => {
  try {
    // TokenAuth middleware adds req.user with decoded token data
    const user = await User.findOne({ userName: req.user.userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data (don't include sensitive data like password)
    res.status(200).json({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
