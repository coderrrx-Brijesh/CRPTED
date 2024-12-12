const Express = require("express");
const Router = Express.Router();

const User = require("../models/userModel"); // user model
const UserSchemaValidator = require("../validations/UserValidator"); //zod validation
const {connectDB,getUserByUsername} = require("./config/database");
const RegisterController = require("../controllers/RegisterController");
const SignInController = require("../controllers/SignInController");
const HashPassword  = require("../controllers/HashPasswordController");
const UserAuth = require("../Middleware/UserMiddleware"); // middleware for user auth

// Connecting to database
connectDB();

