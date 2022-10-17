const express=require("express");
const router=express.Router();
const {register,deleteurl,getall,get,redirecturl}= require("../controller/urlshort");



router.get("/get/:id",get)
router.get("/getall",getall)
router.get("/redir/:key",redirecturl)
router.post("/register",register)
router.delete("/deleteurl/:id",deleteurl)

module.exports=router    