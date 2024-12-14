
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
        userName: req.body.userName,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });
      try{
        // if newUser already registered
        const existingUser = await User.findOne({ userName: req.body.userName });
        if (existingUser) {
          return res.status(411).json({ message: "Email already taken" });
        }
        // if doesn't exit save new User
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
      }catch(error){
        console.log(error);
      }
}
catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports={registerUser};