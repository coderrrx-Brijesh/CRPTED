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

// CRUD Operations

const getAllUsers = async () => {
  try {
    const users = await User.find();
    console.log("Users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
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

const addWalletAddress = async (username, walletData) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return;
    }
    user.walletAddresses.push(walletData);
    await user.save();
    console.log("Updated user with new wallet address:", user);
  } catch (error) {
    console.error("Error adding wallet address:", error);
  }
};

const deleteUser = async (username) => {
  try {
    const result = await User.deleteOne({ username });
    if (result.deletedCount === 0) {
      console.log("No user found to delete");
      return;
    }
    console.log("User deleted:", username);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const deleteWalletAddress = async (username, address) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return;
    }
    // Filter out the address from the walletAddresses array
    user.walletAddresses = user.walletAddresses.filter(
      (wallet) => wallet.address !== address
    );
    await user.save();
    console.log("Updated user with wallet address removed:", user);
  } catch (error) {
    console.error("Error deleting wallet address:", error);
  }
};

module.exports={ connectDB,getAllUsers,deleteUser,deleteWalletAddress ,addWalletAddress,getUserByUsername};