const express=require("express")
const reset=require("./route/reset")
const morgan=require('morgan')
const composemail= require("./route/compose")
const datum= require("./route/datum")
const urla= require("./route/urlshort")
const auth=require("./route/auth")
//const jwt =require("jsonwebtoken");
const cors=require('cors')
const {connect}=require('./dbconnect');
const app=express(); 
  

app.set("view engine","ejs");
app.use(cors());
app.use(morgan());
app.use(express.json()); 
app.use(express.urlencoded({extended:true})) 
  // res.render("home")})

 
//-----------------------------------------------
app.use("/",reset)
app.use("/url",urla)
app.use('/api/compose',composemail)
app.use('/api/auth',auth)
app.use('/api/data',datum)

app.listen(8000,(req,res)=>{
  connect()
    console.log("backend connected")
})   
      