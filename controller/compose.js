const nodemailer = require("nodemailer");
const Composeemail =require("../models/compose")


compose=(async(req,res)=>{
    const {email,subject,message} = req.body;
   
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
    console.log(mailercontent) 

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
});

module.exports={compose}