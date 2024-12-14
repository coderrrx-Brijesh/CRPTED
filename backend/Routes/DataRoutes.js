const express= require("express");
const router= express.Router();

const {allUserData}=require("../controllers/DataController");
const {TokenAuth}=require("../Middleware/TokenAuth");

router.get("/allusersdata",TokenAuth,allUserData);

module.exports=router;