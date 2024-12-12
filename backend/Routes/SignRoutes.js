const express = require("express");
const router = express.Router();

const { validateSignUp, validateSignIn } = require("../Middleware/Validate"); // zod validation
const { registerUser } = require("../controllers/RegisterController");
const { signIn } = require("../controllers/SignInController");
const { getProfile } = require("../controllers/ProfileController");
const { TokenAuth } = require("../Middleware/TokenAuth"); // middleware for user auth

// POST route for sign-up
router.post("/signup", registerUser);

// route to POST for sign-in
router.post("/signin", signIn);  // Use POST instead of GET

// route to get user profile
router.get("/profile", TokenAuth, getProfile);

module.exports = router;
