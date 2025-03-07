const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { SignUpSchemaValidator } = require("../validations/UserValidator");
const saltRounds = 10;

const registerUser = async (req, res) => {
  try {
    // Validate the incoming request body
    const validData = SignUpSchemaValidator.parse(req.body);

    // Check if the userName already exists
    const existingUser = await User.findOne({ userName: validData.userName });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(validData.password, saltRounds);

    // Create a new user instance
    const newUser = new User({
      userName: validData.userName,
      password: hashedPassword,
      firstName: validData.firstName,
      lastName: validData.lastName,
    });
    try {
      // if doesn't exit save new User
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      // Handle database save errors (e.g., unique constraint violation)
      if (error.code === 11000) {
        // MongoServerError: Duplicate key error
        // Extract the duplicate key field name (this is a simplified example)
        const field = Object.keys(error.keyPattern)[0];
        return res
          .status(409)
          .json({ errors: { [field]: `${field} already exists.` } });
      }
      console.log(error);
      return res.status(500).json({ message: "Failed to save user." });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    if (error.name === "ZodError") {
      // Handle Zod validation errors
      const errors = {};
      error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      return res.status(400).json({ errors }); // Return errors in the expected format
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { registerUser };
