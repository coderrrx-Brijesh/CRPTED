const { SignUpSchemaValidator, SignInSchemaValidator } = require("../validations/UserValidator");

const validateSignUp = (req, res, next) => {
  try {
    // Validate request body using Zod schema
    SignUpSchemaValidator.parse(req.body); // This will throw an error if validation fails
    next(); // If validation is successful, move to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: error.errors[0].message }); // Send validation error message
  }
};

const validateSignIn = (req, res, next) => {
  try {
    // Validate request body using Zod schema
    SignInSchemaValidator.parse(req.body); // This will throw an error if validation fails
    next(); // If validation is successful, move to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: error.errors[0].message }); // Send validation error message
  }
};

module.exports = { validateSignUp, validateSignIn };
