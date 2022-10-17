//const Userlog =require("../models/user");
const bcrypt=require("bcrypt");
const nodemailer = require("nodemailer");
const jwt =require("jsonwebtoken");
const userfin=require("../models/user");
const Composeemail =require("../models/compose")
require('dotenv').config();

   

const JWT="qwerty"

 
//get
const forgethome=async(req,res)=>{res.render("home")}

 
 //post
 const forgetpass=async(req,res)=>{ 
  const pay=req.body
  console.log(pay)
 try{
    userfin.findOne({email:pay.email},async(err,user)=>{ 
      if(!user){
        res.send("no user in the mail")
        return;
      }
    
 if(pay.email   !== user.email) 
  { 
    res.send("invalid mail id")
     return; 
  } 
     
  const supersec=user.password
   const secure=JWT+supersec
 
   const payload={
    email:user.email,
    id:user.id 
  } 
  const token = jwt.sign(payload,secure,{expiresIn:'5m'});
  const link=`https://startling-bavarois-af96a1.netlify.app/${user._id}/${token}`
    console.log(link)

    const email=user.email 
    const subject="reset link is here"
    const message=link
   
    const newcompose= new Composeemail({
      email:email, 
      subject:subject, 
      html:message,
  })
  await newcompose.save()

  //------------nodemailer--------------------
  var sender=nodemailer.createTransport({ 
    secure:false,
    service:"gmail",
    auth:{
        user:"manjugopi610@gmail.com", 
    pass:'gasclvpnsuhezlzx'
    }
});
//----------modal----------------------

//------------nodemailer------------------
var mailercontent={
    from:"manjugopi610@gmail.com",
 to:newcompose.email,
 subject:newcompose.subject,
 html:newcompose.html,
} 


sender.sendMail( mailercontent ,
(error,body)=>{
    if(error){
        console.log(error);
        res.status(500).send({message:"error in sending mail ok"});
    }
    else{
        console.log(body);
        res.status(200).send({message:"email send sucessfully"})
    }
})
   res.send("password reset link has to be sent to ur registered mail") 
})}

catch(error){
  res.status(401).send("Email/User not valid")
}
}
 

//get
const resethome=async(req,res)=>{

const load=req.params
try{ 
  userfin.findOne({_id:load.id},async(err,data)=>{
    
  if(load.id !== `${data._id}`) 
  {    
    res.send("invalid mail id") 
    return;
  } 
  const supersec=data.password
  const sec=JWT+supersec    
 
   const mm= jwt.verify(load.token,sec)
   console.log(data.email)
   //res.render("reset",{email:data.email})
   res.json({email:data.email}) 
  })}
catch(error){res.send("error")}  
}  
  
//post 
const confirmreset=async(req,res)=>{

const load=req.params 
const pass=req.body 

console.log(load.id) 
try{ 
  userfin.findOne({_id:load.id},async(err,user)=>{

    if(pass.password !== pass.password1)
    { 
      return; 
    } 
    const s=JWT+user.password
    if(load.id !== `${user._id}`)
    { 
      res.send("invalid user klid")     
       return; 
    } 
    const pay=jwt.verify(load.token,s)

    var salt=bcrypt.genSaltSync(10);
    var hash=bcrypt.hashSync(pass.password,salt)
   
    const mm={password:`${hash+""}`}
  console.log(mm)
    await userfin.findByIdAndUpdate(load.id,{$set:mm},{new:true}); 
   res.send("sucessfull set password")

  }) 
}

catch(error){
 res.send("error in set")  
} 
 
console.log(req.params)

}

module.exports={forgethome,forgetpass,resethome,confirmreset}

/*await userfin.findOne({_id:load.id},async(err,data)=>{
    
  if(load.id !== `${data._id}`)
  {    
    res.send("invalid mail id") 
  } 
  const supersec=data.password
  const sec=JWT+supersec   
 
   const mm= jwt.verify(load.token,sec)
    */