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
  
      // Successful sign-in
      res.status(200).json({ 
        message: "Sign-in successful", 
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          dob: user.dob
        }
      });
    } catch (error) {
      console.error("Error during sign-in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = { signIn };
  