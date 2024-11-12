const mongoose = require("mongoose");
require("dotenv").config();
// Define your User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  walletAddresses: [
    {
      currency: { type: String, required: true }, // e.g., "Bitcoin", "Ethereum"
      address: { type: String, required: true, unique: true }, // public address
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

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
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    console.log("User created:", savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

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

module.exports={ User , connectDB ,createUser,getAllUsers,deleteUser,deleteWalletAddress ,addWalletAddress,getUserByUsername};