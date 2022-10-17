const express=require("express");
const router=express.Router();
const {forgethome,forgetpass,resethome,confirmreset}= require("../controller/reset");



router.get("/",forgethome)
router.post("/forget-pass",forgetpass)
router.get("/reset-pass/:id/:token",resethome)
router.post("/reset-pass/:id/:token",confirmreset)

module.exports=router  