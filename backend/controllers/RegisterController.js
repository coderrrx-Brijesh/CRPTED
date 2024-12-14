
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
        lastName: validData.lastName
      });
      try{
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
