const Express = require("express");
const Router = Express.Router();


const {connectDB,getUserByUsername} = require("./config/database");
const RegisterController = require("../controllers/RegisterController");
const SignInController = require("../controllers/SignInController");

// Connecting to database
connectDB();

Router.get('/sigin',SignInController);
Router.post('/signup',RegisterController);

module.export={Router};