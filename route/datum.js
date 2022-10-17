const express=require("express");
const router=express.Router();
const {Adminvalidation}=require("../utils/verifytoken")
 const {getmails,getmail,deletemail}= require("../controller/datum")


 router.get("/getmails",Adminvalidation,getmails)
  router.get("/getmail/:id",getmail)
  router.delete("/deletemail/:id",Adminvalidation,deletemail)
 

  module.exports=router;