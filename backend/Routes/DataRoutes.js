const express= require("express");
const router= express.Router();

const {getData}=require("../config/database");
const {TokenAuth}=require("../Middleware/TokenAuth");

router.get("/allusers",TokenAuth,getData);

module.exports=router;