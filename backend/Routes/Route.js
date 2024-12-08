const Express = require("express");
const Router = Express.Router();

const User = require("../models/userDataModel"); // user model
const UserSchemaValidator = require("../validations/UserValidator"); //zod validation
const UserAuth = require("../Middleware/UserMiddleware"); // middleware for user auth
const { User,connectDB, createUser, getAllUsers,deleteUser,deleteWalletAddress,addWalletAddress,getUserByUsername} = require("./config/database");
const { HashPassword } = require("./RouteFunction");
const {UserAuth} = require("../Middleware/UserMiddleware");
// Connecting to database
connectDB();

Router.get("/signup", async (req, res) => {
  try {
    const validation = UserSchemaValidator.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(411)
        .json({ message: "Email already taken/Incorrect inputs" });
    }
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(411).json({ message: "Email already taken" });
    }
    const hashedPassword = await HashPassword(req.body.password);

    const NewUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    createUser(NewUser);
    res.json({ message: "User created successfully" });
  } catch {
    res.status(500).json({ message: "Error creating user" });
  }
});

Router.get("/sigin",UserAuth,(res,req)=>{
  const user = getUserByUsername(res.username);
  req.status(200).json(user);
})

module.exports = Router;
