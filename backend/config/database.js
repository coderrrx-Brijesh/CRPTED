const mongoose = require("mongoose");

require("dotenv").config();

const db_url = process.env.DATABASE_URL;

const connectDB =()=>{
    mongoose.connect(db_url)
    .then(()=>{console.log("database connected")})
    .catch((err)=>{console.log("database not connected")});
} 

module.exports=connectDB