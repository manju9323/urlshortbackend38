const { findOne } = require("../models/urlshort");
const Urlshort=require("../models/urlshort");
require('dotenv').config();

//register post
register=async(req,res)=>{  
    try{
const newurl= new Urlshort({
    title:req.body.title,
    url:req.body.url,
    detail:req.body.detail,
    key:keygenerate(),
})
await newurl.save()
res.status(200).send("url has been created")
    }
    catch(err){
        res.status(401).send("url schema error")

    } 

};

function keygenerate(){
    var temp=""
    var char="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@$#&?abcdefghijklmnopqrstuvwxyz"
    var charlength=char.length;

    for(let i=0;i<5;i++){
        temp += char.charAt(Math.floor(Math.random()*charlength));
    }
    return temp
}

//get all
getall=async(req,res)=>{
    try{
        m=await Urlshort.find()
        res.send(m)
    }
    catch(err)
    {
        res.send("err")
    }
}

// get
get=async(req,res)=>{
    try{
        m= await Urlshort.findById(req.params.id);
        res.send(m)
    }
    catch(err)
    {
        res.sen("err")
    }

}
//
deleteurl=async(req,res)=>{
    try{  
        let url=await Urlshort.findById(req.params.id);
        if(url){
     await Urlshort.findByIdAndDelete(req.params.id);   
 res.status(200).send(`sucessfully deleted url${req.params.id}`)
     }
    else{
        res.status(200).send(`no url in that id ${req.params.id}`)
    }}
     catch(err){
         res.status(500).send("err") 
 
     }   

}

redirecturl=async(req,res)=>{
    try{
       Urlshort.findOne({key:req.params.key},async(err,result)=>{
        if(result)
        {
       await Urlshort.findByIdAndUpdate(result.id,{$inc:{Count:1}},{new:true})
         return res.redirect(result.url) 
        }
        else{
            res.send("error") 
        } 
    })} 
    catch(err){ 
        res.send("err")
    }

}




module.exports={register,deleteurl,getall,get,redirecturl}