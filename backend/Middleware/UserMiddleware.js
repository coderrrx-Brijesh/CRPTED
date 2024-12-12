const { getUserByUsername } = require("./config/database");
const bcrypt = require("bcrypt");

async function UserAuth(req, res, next) {
  try {
    const plainPassword = req.body.password;
    const user = await getUserByUsername(req.body.username);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const hashedPassword = user.password; // Assuming the function returns an object with `password`
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

    if (isMatch) {
      next();
    } else {
      res.status(401).json({ message: "Password is incorrect." });
    }
  } catch (error) {
    console.error("Error verifying password:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}

module.exports = { UserAuth };
