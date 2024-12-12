async function HashPassword(plainPassword) {
    try {
      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(plainPassword,saltRound);
      console.log("Hashed password:", hashedPassword);
      return hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  }

  module.exports =HashPassword;