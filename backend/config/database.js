const mongoose = require("mongoose");
const User = require("../models/userModel");
require("dotenv").config();

// Connect to the database
const connectDB = () => {
  const db_url = process.env.DATABASE_URL;
  mongoose
    .connect(db_url)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.error("Database connection failed", err);
    });
};


const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return;
    }
    console.log("User:", user);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};


module.exports={ connectDB,getUserByUsername};