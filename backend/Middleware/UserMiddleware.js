const {getUserByUsername} = require("./config/database");
const {bcrypt}= require("bcrypt"); 
async function UserAuth(req, res, next) {

        const plainPassword=req.body.password;
         const hashedPassword = await getUserByUsername(req.body.username);
        try {
          const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
          if (isMatch) {
           next();
          } else {
            res.status(401).json({ message: "Password is incorrect." });
          }
        } catch (error) {
          console.error("Error verifying password:", error);
        }
      
}
module.exports ={UserAuth};
