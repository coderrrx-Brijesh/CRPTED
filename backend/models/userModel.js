const mongoose = require("mongoose");

// Define your User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
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
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 50,
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true,
        trim: true,
        maxLength: 10,
    },
    dob:{
        type: Date,
        required: true
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
//   walletAddresses: [
//     {
//       currency: { type: String, required: true }, // e.g., "Bitcoin", "Ethereum"
//       address: { type: String, required: true, unique: true }, // public address
//       createdAt: { type: Date, default: Date.now },
//     },
//   ],
});

module.exports = mongoose.model("User", UserSchema);