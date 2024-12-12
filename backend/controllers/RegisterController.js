const mongoose=require("mongoose");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerUser =async (req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        dob: req.body.dob
      });
      try{
        // if newUser already registered
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
          return res.status(411).json({ message: "Email already taken" });
        }
        // if doesn't exit save new User
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
      }catch(error){
        console.log(error);
      }
}