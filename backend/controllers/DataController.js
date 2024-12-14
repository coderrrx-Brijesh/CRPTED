const  User  = require("../models/userModel");
const allUserData = (req,res)=>{
    try{
        User.find().then((data)=>{
            res.status(200).json(data)
            console.log(data);
        })
    }
    catch(error){
        console.log("Server not reachable");
    }
}

module.exports={allUserData};