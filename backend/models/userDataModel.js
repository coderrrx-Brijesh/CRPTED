 const mongoose = require('mongoose');
 
 const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30
    },
    password: {
      type: String,
      required: true,
      minLength: 6
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
    },
    walletAddresses: [
        {
          currency: { type: String, required: true }, // e.g., "Bitcoin", "Ethereum"
          address: { type: String, required: true, unique: true }, // public address
          createdAt: { type: Date, default: Date.now }
        }
      ]
  });
  const User = mongoose.model('User',UserSchema);
  module.exports = User;