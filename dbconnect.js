require('dotenv').config();
const mongoose=require("mongoose");


exports.connect=async()=>{
await mongoose.connect(process.env.mongo_url,()=>{
    console.log("gmail db connected")
});  
 
};          