const userfin=require("../models/user");
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");
require('dotenv').config();

//register post
register=async(req,res)=>{  
    try{
        var salt=bcrypt.genSaltSync(10);
        var hash=bcrypt.hashSync(req.body.password,salt)

const newuser= new userfin({
    name:req.body.name,
    email:req.body.email,
    password:hash,

})
await newuser.save()
res.status(200).send("user has been created")
    }
    catch(err){
        res.status(401).send("Email/User already registered")

    }

};


//login post

login=(req,res)=>{
try{
    let payload=req.body;
    userfin.findOne({email:payload.email},async(err,user)=>{
        if(err || !user)
        {
            return res.status(400).json({
                err:"user mail does not exist"
            });
        }
        const validUser=await bcrypt.compare(payload.password,user.password);
        if(validUser)
        {
            const token = jwt.sign({_id:user._id},process.env.secure);
       //*  res.cookie("mm",token,{expire:new Date() +9999});
        //  res.header("mm",token,{expire:new Date() +9999});
        res.header("mm",token).json(token);
        //    const {_id,name,email}=user;
       //    return res.status(200).json({token,user:{_id,email,name}});
 
        }
        else{  
            return res.status(400).json({
                err:"invalid user/password" 
            });

        }
    })
}

catch(err){
    return res.status(400).json({
        err:"user with that mail does not exist"
    });
}

}



/*
//login post
login=async(req,res,next)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        if(!user)
        return res.send("error username")

        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect)
        return res.send("password wrong")

        //usingjwt for login person is admin or not
        const token=jwt.sign({_id:user._id}, 
            process.env.jwt)
 

        const{password,isAdmin,...otherDetails}=user._doc;
  
    
res.cookie("access_token",token,{httpOnly:true}).status(200).send({otherDetails});
    }
    catch(err){       
        res.send("err")

    }

}  
*/
//logout
 logout=(req,res)=>{
   // res.clearCookie("mm");
   // res.json({
   // message:"sucessfully signedout"
  res.clearCookie("mm")
    res.json({
    message:"sucessfully signedout"
    })
 }



module.exports={register,login,logout}