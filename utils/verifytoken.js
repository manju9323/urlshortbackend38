require('dotenv').config();
const jwt =require("jsonwebtoken");

exports.Adminvalidation=(req,res,next)=>{
 // var token =req.cookies
  //var token=req.header("mm")
  let token=req.header("mm")
  req.token=token;
  
  jwt.verify(req.token,process.env.secure,async(err,data)=>{
    if(err){
        res.send("invalid authentication")
    }
    else{(next())} 
  })

    }; 
      