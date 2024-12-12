
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { SignUpSchemaValidator } = require("../validations/UserValidator");
const saltRounds = 10;

export const registerUser = async (req, res) => {
  try {
    // Validate the incoming request body
    const validData = SignUpSchemaValidator.parse(req.body);

    // Check if the username already exists
    const existingUser = await User.findOne({ username: validData.username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(validData.password, saltRounds);

    // Create a new user instance
    const newUser = new User({
      username: validData.username,
      password: hashedPassword,
      firstName: validData.firstName,
      lastName: validData.lastName,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
