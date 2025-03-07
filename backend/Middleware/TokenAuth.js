const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const TokenAuth = (req, res, next) => {
  try {
    // Get token from different possible sources
    let token;

    // Check authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // If no token in auth header, check cookies
    if (!token) {
      token = req.cookies.authToken_http || req.cookies.authToken;
    }

    // If still no token, return unauthorized
    if (!token) {
      console.log("No token found in request");
      return res.status(401).json({ message: "Authentication token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add user data to request object
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { TokenAuth };
