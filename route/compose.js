const express=require("express");
const router=express.Router();
const {Adminvalidation}=require("../utils/verifytoken")
const {compose }= require("../controller/compose");

router.post("/mail",Adminvalidation,compose)


module.exports=router 