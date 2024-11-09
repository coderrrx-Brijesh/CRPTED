const Express = require("express");
const Router = Express.Router();

const User = require("../models/userDataModel"); // user model
const Axios = require("axios"); // axios for api calls
const bcrypt = require("bcrypt"); // for hashing passwords
const jwt = require("jsonwebtoken"); // for generating tokens
const UserValidationSchema = require('../validations/UserValidator') //zod validation
const UserAuth = require('../Middleware/UserMiddleware'); // middleware for user auth
const connectDB = require("./config/database"); // Connecting to database
connectDB();

Router.get("/fetch-data", async (req, res) => {
  try {
    const response = await Axios.get(
      "https://jsonplaceholder.typicode.com/posts..."
    )
    console.log(response.data);
    res.status(200).json(response.data);
  } catch {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});





module.exports = Router;
