const mongoose=require("mongoose");

const composeschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        unique:true,
        required:true,
        
     },
    detail:{
        type:String,
        required:true,
    }, 
    key:{
        type:String,
        required:true,
    }, 
    Count:{
        type:Number,
        default:0,
    }, 
   
},
{timestamps:true});



module.exports=mongoose.model("Urlshort",composeschema)