import { User } from "../models/userModel";
import { SignInSchemaValidator } from "../validations/UserValidator";
import bcrypt from "bcrypt";

export const signIn = async (req, res) => {
  try {
    // Validate the incoming request body
    const validData = SignInSchemaValidator.parse(req.body);

    // Fetch the user from the database using the username
    const user = await User.findOne({ username: validData.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(validData.password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Successful sign-in
    res.status(200).json({
      message: "Sign-in successful",
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    if (error.name === "ZodError") {
      // Handle validation errors
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
